import { NextResponse } from "next/server";
import { fetchProductByIdFromSupabase } from "../../../lib/supabase";

/**
 * @param {Request} request - The incoming request.
 * @param {{ params: { id: string } }} context - The route parameters.
 * @returns {Promise<NextResponse>} The response with a product.
 * @description Handles GET requests to fetch a product by ID.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await fetchProductByIdFromSupabase(params.id);
    if (product) {
      return NextResponse.json(product);
    } else {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
