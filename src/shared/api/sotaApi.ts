import { BASE_URL } from '../lib/config';
import type { FaqItem, Postomat, Category } from '../types/api';

// Базовая функция запроса
async function fetchData<T>(endpoint: string): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch ${url}:`, error);
    throw error;
  }
}

export const sotaApi = {
  // Получение FAQ
  getFaq: () => fetchData<FaqItem[]>('/api/utils/faq'),
  
  // Получение списка постаматов (Platform)
  getPostomats: () => fetchData<Postomat[]>('/api/platform'),
  
  // Получение категорий
  getCategories: () => fetchData<Category[]>('/api/category'),
};