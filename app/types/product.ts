export interface Product {
  id: string; // UUID in Supabase
  name: string;
  price: number;
  description: string; // Now supports HTML/Markdown for rich formatting
  image?: string; // Deprecated: use image_urls
  image_urls: string[];
  stock: number;
  is_best_seller: boolean;
  sizes: string[];
  created_at?: string;
}