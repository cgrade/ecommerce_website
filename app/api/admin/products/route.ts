import { NextResponse } from "next/server";
import { addProductToSupabase } from "../../../lib/supabase";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";
import { Product } from "../../../types/product";

/**
 * @param {Request} request - The incoming request.
 * @returns {Promise<NextResponse>} The response with the added product.
 * @description Handles POST requests to add a new product.
 */
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data: Omit<Product, "id" | "created_at"> = await request.json();

  try {
    const newProduct = await addProductToSupabase(data);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}
