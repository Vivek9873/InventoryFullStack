const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

interface FetchOptions extends RequestInit {
  requiresAuth?: boolean;
}

async function apiFetch(endpoint: string, options: FetchOptions = {}) {
  const { requiresAuth = false, ...fetchOptions } = options;
  
  const config: RequestInit = {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
    credentials: 'include',
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

// Auth APIs
export const authAPI = {
  register: (userData: { username: string; email: string; password: string; role: 'Buyer' | 'Seller' }) =>
    apiFetch('/user/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  login: (credentials: { email: string; password: string }) =>
    apiFetch('/user/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  logout: () =>
    apiFetch('/user/logout', {
      method: 'GET',
      requiresAuth: true,
    }),
};

// Product APIs
export const productAPI = {
  getAll: (params?: { page?: number; limit?: number; sortBy?: string; sortOrder?: 'asc' | 'desc' }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    
    return apiFetch(`/product?${queryParams.toString()}`, {
      method: 'GET',
      requiresAuth: true,
    });
  },

  getMyProducts: () =>
    apiFetch('/product/myproducts', {
      method: 'GET',
      requiresAuth: true,
    }),

  add: (productData: {
    name: string;
    type: string;
    image_url: string;
    description: string;
    quantity: number;
    price: number;
  }) =>
    apiFetch('/product/add', {
      method: 'POST',
      body: JSON.stringify(productData),
      requiresAuth: true,
    }),

  update: (id: string, productData: Partial<{
    name: string;
    type: string;
    image_url: string;
    description: string;
    quantity: number;
    price: number;
  }>) =>
    apiFetch(`/product/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
      requiresAuth: true,
    }),

  delete: (id: string) =>
    apiFetch(`/product/delete/${id}`, {
      method: 'DELETE',
      requiresAuth: true,
    }),
};

export { API_URL };