import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      name: 'No user',
      setName: (name) => set({ name }),
      setLogin: () => set({ isLoggedIn: true }),
      setLogout: () => set({ isLoggedIn: false }),
    }),
    {
      name: 'auth-storage', // unique name for the storage
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    }
  )
);

export default useAuthStore;