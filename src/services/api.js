const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost/e-commerce-backend/public/api'

export async function apiRequest(path, options = {}) {
  const headers = {
    Accept: 'application/json',
    ...options.headers,
  }

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    const error = new Error(errorData.message || `API request failed with status ${response.status}`)
    error.status = response.status
    error.errors = errorData.errors
    throw error
  }

  return response.json()
}

export function getBackendHealth() {
  return apiRequest('/health')
}

export function getDashboardStats() {
  return apiRequest('/stats')
}

// Category CRUD
export function getCategories(dashboard = false) {
  return apiRequest(`/categories${dashboard ? '?dashboard=1' : ''}`)
}

export function createCategory(data) {
  return apiRequest('/categories', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updateCategory(id, data) {
  return apiRequest(`/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deleteCategory(id) {
  return apiRequest(`/categories/${id}`, {
    method: 'DELETE',
  })
}

// Product CRUD
export function getProducts(dashboard = false) {
  return apiRequest(`/products${dashboard ? '?dashboard=1' : ''}`)
}

export function getProduct(id) {
  return apiRequest(`/products/${id}`)
}

export function getProductsByCategory(categorySlug) {
  return apiRequest(`/products?category=${encodeURIComponent(categorySlug)}`)
}

export function createProduct(data) {
  const isFormData = data && typeof data.append === 'function';
  return apiRequest('/products', {
    method: 'POST',
    body: isFormData ? data : JSON.stringify(data),
  })
}

export function updateProduct(id, data) {
  const isFormData = data && typeof data.append === 'function';
  if (isFormData) {
    data.append('_method', 'PUT')
  }
  return apiRequest(`/products/${id}`, {
    method: isFormData ? 'POST' : 'PUT',
    body: isFormData ? data : JSON.stringify(data),
  })
}

export function deleteProduct(id) {
  return apiRequest(`/products/${id}`, {
    method: 'DELETE',
  })
}

// User CRUD
export function getUsers() {
  return apiRequest('/users')
}

export function createUser(data) {
  return apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updateUser(id, data) {
  return apiRequest(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deleteUser(id) {
  return apiRequest(`/users/${id}`, {
    method: 'DELETE',
  })
}

// Customer CRUD
export function getCustomers() {
  return apiRequest('/customers')
}

export function createCustomer(data) {
  return apiRequest('/customers', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updateCustomer(id, data) {
  return apiRequest(`/customers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deleteCustomer(id) {
  return apiRequest(`/customers/${id}`, {
    method: 'DELETE',
  })
}

// System Settings API
export function getSettings() {
  return apiRequest('/settings')
}

export function saveSettings(settings) {
  return apiRequest('/settings', {
    method: 'POST',
    body: JSON.stringify({ settings }),
  })
}

export function clearSystemCache() {
  return apiRequest('/settings/clear-cache', { method: 'POST' })
}

export function seedSystemDatabase() {
  return apiRequest('/settings/seed-database', { method: 'POST' })
}

export function loginUser(email, password) {
  return apiRequest('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}


