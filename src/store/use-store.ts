import { create } from 'zustand';
import { CollegeFilters } from '../types';

interface User {
  username: string;
  email: string;
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, email: string) => void;
  logout: () => void;
  signup: (username: string, email: string) => void;

  savedColleges: string[];
  toggleSaveCollege: (id: string) => void;

  compareList: string[];
  addToCompare: (id: string) => boolean;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;

  filters: CollegeFilters;
  setFilters: (filters: Partial<CollegeFilters>) => void;
  resetFilters: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const initialFilters: CollegeFilters = {
  state: 'All',
  feesMax: 80000,
  ratingMin: 0,
  courseType: 'All',
  placementMin: 0,
};

export const useStore = create<AppState>((set, get) => {
  const getLocalStorage = (key: string, defaultValue: any) => {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const setLocalStorage = (key: string, value: any) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.error(e);
      }
    }
  };

  return {
    user: getLocalStorage('cv_user', null),
    isAuthenticated: getLocalStorage('cv_auth', false),
    savedColleges: getLocalStorage('cv_saved', []),
    compareList: [],
    filters: initialFilters,
    searchQuery: '',
    theme: getLocalStorage('cv_theme', 'dark'),

    login: (username, email) => {
      set({ user: { username, email }, isAuthenticated: true });
      setLocalStorage('cv_user', { username, email });
      setLocalStorage('cv_auth', true);
    },
    logout: () => {
      set({ user: null, isAuthenticated: false });
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cv_user');
        localStorage.removeItem('cv_auth');
      }
    },
    signup: (username, email) => {
      set({ user: { username, email }, isAuthenticated: true });
      setLocalStorage('cv_user', { username, email });
      setLocalStorage('cv_auth', true);
    },

    toggleSaveCollege: (id) => {
      const { savedColleges } = get();
      const updated = savedColleges.includes(id)
        ? savedColleges.filter(cid => cid !== id)
        : [...savedColleges, id];
      
      set({ savedColleges: updated });
      setLocalStorage('cv_saved', updated);
    },

    addToCompare: (id) => {
      const { compareList } = get();
      if (compareList.includes(id)) return false;
      if (compareList.length >= 3) return false;
      set({ compareList: [...compareList, id] });
      return true;
    },
    removeFromCompare: (id) => {
      const { compareList } = get();
      set({ compareList: compareList.filter(cid => cid !== id) });
    },
    clearCompare: () => {
      set({ compareList: [] });
    },

    setFilters: (newFilters) => {
      set((state) => ({ filters: { ...state.filters, ...newFilters } }));
    },
    resetFilters: () => {
      set({ filters: initialFilters });
    },
    setSearchQuery: (query) => {
      set({ searchQuery: query });
    },

    toggleTheme: () => {
      const currentTheme = get().theme;
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      set({ theme: nextTheme });
      setLocalStorage('cv_theme', nextTheme);
    }
  };
});
