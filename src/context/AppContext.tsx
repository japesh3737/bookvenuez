import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { venuesData, VenueItem } from '../data/venuesData';

export interface SearchFilters {
  city: string;
  eventType: string;
  category: string;
  guestCount: string;
  food: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  searchTerm: string;
}

interface AppContextType {
  wishlist: number[];
  addToWishlist: (id: number) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  
  compareList: number[];
  setCompareVenues: (ids: number[]) => void;
  addToCompare: (id: number) => boolean;
  removeFromCompare: (id: number) => void;
  isInCompare: (id: number) => boolean;
  
  searchFilters: SearchFilters;
  setSearchFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  updateFilter: (key: keyof SearchFilters, value: any) => void;
  resetFilters: () => void;
  
  user: { email: string; name?: string } | null;
  login: (email: string) => void;
  logout: () => void;
  
  allVenues: VenueItem[];
}

const defaultFilters: SearchFilters = {
  city: '',
  eventType: '',
  category: '',
  guestCount: '',
  food: '',
  searchTerm: '',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('bv_wishlist');
      return saved ? JSON.parse(saved) : [13, 18]; // defaults
    } catch {
      return [13, 18];
    }
  });

  const [compareList, setCompareList] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('bv_compare');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? [...new Set(parsed)].filter((id): id is number => typeof id === 'number' && venuesData.some(v => v.id === id)).slice(0, 3) : [];
    } catch {
      return [];
    }
  });

  const [searchFilters, setSearchFilters] = useState<SearchFilters>(defaultFilters);

  const [user, setUser] = useState<{ email: string; name?: string } | null>(() => {
    try {
      const saved = localStorage.getItem('bv_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem('bv_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('bv_compare', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('bv_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('bv_user');
    }
  }, [user]);

  const addToWishlist = (id: number) => {
    setWishlist((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item !== id));
  };

  const isInWishlist = (id: number) => wishlist.includes(id);

  const addToCompare = (id: number) => {
    if (compareList.includes(id)) return true;
    if (compareList.length >= 3) {
      toast.info('Three venues selected. Remove one from the comparison bar to add another.');
      return false;
    }
    setCompareList((prev) => (prev.includes(id) || prev.length >= 3 ? prev : [...prev, id]));
    return true;
  };

  const removeFromCompare = (id: number) => {
    setCompareList((prev) => prev.filter((item) => item !== id));
  };

  const isInCompare = (id: number) => compareList.includes(id);

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setSearchFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setSearchFilters(defaultFilters);
  };

  const login = (email: string) => {
    const name = email.split('@')[0];
    setUser({ email, name });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        compareList,
        setCompareVenues: ids => setCompareList([...new Set(ids)].filter(id => venuesData.some(v => v.id === id)).slice(0, 3)),
        addToCompare,
        removeFromCompare,
        isInCompare,
        searchFilters,
        setSearchFilters,
        updateFilter,
        resetFilters,
        user,
        login,
        logout,
        allVenues: venuesData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
