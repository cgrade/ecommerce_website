import { NextResponse } from "next/server";
import { updateProductInSupabase } from "../../../../lib/supabase";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/auth";
import { Product } from "../../../../types/product";

/**
 * @param {Request} request - The incoming request.
 * @param {{ params: { id: string } }} context - The route parameters.
 * @returns {Promise<NextResponse>} The response with the updated product.
 * @description Handles PUT requests to update a product by ID.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data: Partial<Product> = await request.json();

  try {
    const updatedProduct = await updateProductInSupabase(params.id, data);
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
