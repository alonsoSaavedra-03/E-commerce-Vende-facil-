const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost/e-commerce-backend/public/api'

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }

  return response.json()
}

export function getBackendHealth() {
  return apiRequest('/health')
}

export function getProducts() {
  return apiRequest('/products')
}

export function getProductsByCategory(categorySlug) {
  return apiRequest(`/products?category=${encodeURIComponent(categorySlug)}`)
}

export function getCategories() {
  return apiRequest('/categories')
}
