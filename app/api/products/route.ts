import { NextResponse } from "next/server";
import { fetchProductsFromSupabase } from "../../lib/supabase";

/**
 * @param {Request} request - The incoming request.
 * @returns {Promise<NextResponse>} The response with products.
 * @description Handles GET requests to fetch products.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  try {
    const products = await fetchProductsFromSupabase({ q: query });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
