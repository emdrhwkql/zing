import { create } from "zustand";

interface AuthStoreState {
    isLoggedIn: boolean;
    logIn: () => void;
    logOut: () => void;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
    isLoggedIn: false,
    logIn: () => set({ isLoggedIn: true }),
    logOut: () => set({ isLoggedIn: false }),
}));
