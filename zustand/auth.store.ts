import { User } from "@supabase/supabase-js";
import { create } from "zustand";

interface AuthStoreState {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
  currentUser: User | null
	isLoggedIn: boolean;
  setCurrentUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  isLoggedIn: false,
  logIn: () => set({ isLoggedIn: true }),
  logOut: () => set({ isLoggedIn: false }),
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser }),
}));
