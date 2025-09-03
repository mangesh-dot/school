import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import fs from "fs";
import path from "path";

// Helper to sanitize file names
function sanitizeFileName(name) {
  return name.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9._-]/g, "");
}

// GET all schools
export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM schools");

    return NextResponse.json(rows, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    console.error("❌ Error in /api/schools GET:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST add new school with image upload
export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const file = formData.get("image");

    let imagePath = null;

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public/schoolImages");
      fs.mkdirSync(uploadDir, { recursive: true });

      const safeFileName = sanitizeFileName(file.name);
      const filePath = path.join(uploadDir, safeFileName);
      fs.writeFileSync(filePath, buffer);

      imagePath = `/schoolImages/${safeFileName}`;
    }

    await pool.query(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, imagePath, email_id]
    );

    return NextResponse.json(
      { message: "School added successfully", image: imagePath },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (err) {
    console.error("❌ Error in /api/schools POST:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
