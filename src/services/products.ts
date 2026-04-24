import { api } from '../api';
import { GetProductsParams } from '../types/getProductsParams';

export async function getProducts({
  search = '',
  category = '',
  maxPrice,
  limit = 10,
  skip = 0,
}: GetProductsParams) {
  let endpoint = search
    ? `/products/search?q=${search}&limit=${limit}&skip=${skip}`
    : `/products?limit=${limit}&skip=${skip}`;

  if (category) {
    endpoint = `/products/category/${category}?limit=${limit}&skip=${skip}`;
  }

  const response = await api.get(endpoint);

  let products = response.data.products;

  if (maxPrice) {
    products = products.filter(
      (product: any) =>
        product.price <= maxPrice
    );
  }

  return {
    ...response.data,
    products,
  };
}

export async function getCategories() {
  const response = await api.get(
    '/products/categories'
  );

  return response.data;
}

export async function getProductById(id: number) {
  const response = await api.get(`/products/${id}`);

  return response.data;
}