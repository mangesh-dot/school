import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const state = searchParams.get("state");

    console.log("Cities API called with state:", state);

    if (state) {
      // Get cities for specific state from database - using city_state column
      const [cities] = await pool.query(
        "SELECT city_name FROM cities WHERE city_state = ? ORDER BY city_name",
        [state]
      );
      
      const cityNames = cities.map(city => city.city_name);
      console.log("Returning", cityNames.length, "cities for", state);
      return NextResponse.json(cityNames);
      
    } else {
      // Get all unique states from database - using city_state column
      const [states] = await pool.query(
        "SELECT DISTINCT city_state FROM cities ORDER BY city_state"
      );
      
      const stateNames = states.map(state => state.city_state);
      console.log("Returning", stateNames.length, "states");
      return NextResponse.json(stateNames);
    }

  } catch (err) {
    console.error("Error in cities API:", err);
    return NextResponse.json(
      { error: "Failed to fetch data from database: " + err.message },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}