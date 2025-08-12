import { create } from 'zustand';
import { api } from '../lib/api';

export type User = { id: string; email: string; name: string; role: 'ADMIN' | 'ACCOUNTANT' | 'OWNER' | 'STAFF' };

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchMe: () => Promise<void>;
};

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  async login(email, password) {
    set({ loading: true });
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    set({ token: data.token, user: data.user, loading: false });
  },
  async register(name, email, password) {
    set({ loading: true });
    const { data } = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('token', data.token);
    set({ token: data.token, user: data.user, loading: false });
  },
  logout() {
    localStorage.removeItem('token');
    set({ token: null, user: null });
  },
  async fetchMe() {
    const token = get().token;
    if (!token) return;
    try {
      const { data } = await api.get('/auth/me');
      set({ user: data.user });
    } catch {
      localStorage.removeItem('token');
      set({ token: null, user: null });
    }
  },
}));