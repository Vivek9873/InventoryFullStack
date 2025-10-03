export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'Buyer' | 'Seller';
  products?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  name: string;
  type: string;
  image_url: string;
  description: string;
  quantity: number;
  price: number;
  sellerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  currentPage?: number;
  totalPages?: number;
  totalProducts?: number;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  role: 'Buyer' | 'Seller';
}