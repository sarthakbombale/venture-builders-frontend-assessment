import { create } from 'zustand';
import axios from 'axios';
import { User, Product, AuthUser } from '@/types';

interface AppState {
  users: User[];
  products: Product[];
  selectedUser: User | null;
  selectedProduct: Product | null;
  authUser: AuthUser | null;
  loading: boolean;
  userCache: Map<string, User[]>;
  productCache: Map<string, Product[]>;
  fetchUsers: (limit: number, skip: number, search?: string) => Promise<void>;
  fetchSingleUser: (id: string) => Promise<void>;
  fetchProducts: (limit: number, skip: number, search?: string, category?: string) => Promise<void>;
  fetchSingleProduct: (id: string) => Promise<void>;
  setAuthUser: (user: AuthUser | null) => void;
}

export const useStore = create<AppState>((set, get) => ({
  users: [],
  products: [],
  selectedUser: null,
  selectedProduct: null,
  authUser: null,
  loading: false,
  userCache: new Map(),
  productCache: new Map(),

  fetchUsers: async (limit, skip, search = '') => {
    const cacheKey = search ? `search_${search}` : `list_${limit}_${skip}`;
    const cached = get().userCache.get(cacheKey);
    if (cached) {
      set({ users: cached, loading: false });
      return;
    }

    set({ loading: true });
    const url = search
      ? `https://dummyjson.com/users/search?q=${search}`
      : `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;
    const res = await axios.get(url);
    const users = res.data.users;
    set({ users, loading: false });
    get().userCache.set(cacheKey, users);
  },

  fetchSingleUser: async (id) => {
    set({ loading: true });
    const res = await axios.get(`https://dummyjson.com/users/${id}`);
    set({ selectedUser: res.data, loading: false });
  },

  fetchProducts: async (limit, skip, search = '', category = '') => {
    let cacheKey = `list_${limit}_${skip}`;
    if (search) cacheKey = `search_${search}`;
    else if (category && category !== 'all') cacheKey = `category_${category}_${limit}_${skip}`;

    const cached = get().productCache.get(cacheKey);
    if (cached) {
      set({ products: cached, loading: false });
      return;
    }

    set({ loading: true });
    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    if (search) url = `https://dummyjson.com/products/search?q=${search}`;
    else if (category && category !== 'all') url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;

    const res = await axios.get(url);
    const products = res.data.products;
    set({ products, loading: false });
    get().productCache.set(cacheKey, products);
  },

  fetchSingleProduct: async (id) => {
    set({ loading: true });
    const res = await axios.get(`https://dummyjson.com/products/${id}`);
    set({ selectedProduct: res.data, loading: false });
  },

  setAuthUser: (user) => set({ authUser: user }),
}));