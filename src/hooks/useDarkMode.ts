import { create } from 'zustand';

interface DarkModeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const useDarkMode = create<DarkModeState>((set) => ({
  isDarkMode: localStorage.getItem('darkMode') === 'true',
  toggleDarkMode: () => {
    set((state) => {
      const newDarkMode = !state.isDarkMode;
      localStorage.setItem('darkMode', String(newDarkMode));
      document.documentElement.classList.toggle('dark', newDarkMode);
      return { isDarkMode: newDarkMode };
    });
  },
}));

// Initialize dark mode
if (typeof window !== 'undefined') {
  document.documentElement.classList.toggle('dark', useDarkMode.getState().isDarkMode);
}