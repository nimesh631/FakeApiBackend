import { Products } from "./types";

const API_URL = 'http://localhost:5000/api/products'; // Update to your backend

// Fetch products with pagination
export const fetchProducts = async (page: number, limit: number): Promise<{ products: Products[]; total: number }> => {
  try {
    const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;  // Re-throw error to handle it in the component or calling code
  }
};

// Fetch a single product by ID
export const fetchProduct = async (id: number): Promise<Products> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;  // Re-throw error to handle it in the component or calling code
  }
};
