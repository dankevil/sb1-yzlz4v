import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

interface User {
  email: string;
  name?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const mockUser = {
  email: 'sharma.raj2302@gmail.com',
  password: 'Webapp123@',
  name: 'Raj Sharma',
};

export const useAuth = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  user: null,
  isAuthenticated: !!localStorage.getItem('token'),
  login: async (email: string, password: string) => {
    if (email === mockUser.email && password === mockUser.password) {
      const token = 'mock_jwt_token';
      localStorage.setItem('token', token);
      const user = { email: mockUser.email, name: mockUser.name };
      set({ token, user, isAuthenticated: true });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null, isAuthenticated: false });
  },
  updateUser: (updates) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    }));
  },
}));