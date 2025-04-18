export interface Product {
    id: string; // UUID in Supabase
    name: string;
    price: number;
    description: string;
    image: string;
    stock: number;
    is_best_seller: boolean;
    created_at?: string;
  }