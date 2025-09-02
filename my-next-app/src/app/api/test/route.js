import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        message: "testing api working",
        timestamp: new Date().toISOString(),
        status: "ok",
    });
}
