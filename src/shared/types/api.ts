import { BASE_URL } from "../lib/config";

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface Postomat {
  id: number;
  name: string;
  description: string | null;
  city: string;
  address: string;
  hidden: boolean;
  code: number | null;
}

export interface Category {
  id: number;
  name: string;
  hidden: boolean;
  image: string; // Путь вида "/media/category/..."
}

// Полный URL картинки
export const getCategoryImageUrl = (imagePath: string) => {
  return `${BASE_URL}${imagePath}`;
};

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  // price и другие поля игнорируем, так как они не нужны для отображения
}

export interface PostomatLocation {
  id: number;
  name: string;
  address: string;
  coords: [number, number]; // [Широта, Долгота]
  products: Product[];
}