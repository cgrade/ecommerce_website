import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Running Shoes',
    price: 99.99,
    description: 'High-performance running shoes.',
    image: '/images/product1.jpg',
    category: 'Footwear',
    isBestSeller: true,
  },
  {
    id: '2',
    name: 'Yoga Mat',
    price: 29.99,
    description: 'Non-slip yoga mat.',
    image: '/images/product2.jpg',
    category: 'Fitness',
    isBestSeller: false,
  },
];