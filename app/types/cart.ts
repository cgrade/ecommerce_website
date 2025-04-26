export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    selectedSize?: string | null;
  }