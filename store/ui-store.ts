import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  // 사이드바 열림/닫힘 상태
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  // ⌘K 커맨드 메뉴 상태
  commandMenuOpen: boolean;
  setCommandMenuOpen: (open: boolean) => void;
  toggleCommandMenu: () => void;
}

// persist 미들웨어로 사이드바 상태를 localStorage에 유지
export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      commandMenuOpen: false,
      setCommandMenuOpen: (open) => set({ commandMenuOpen: open }),
      toggleCommandMenu: () =>
        set((state) => ({ commandMenuOpen: !state.commandMenuOpen })),
    }),
    {
      name: "ui-state", // localStorage 키 이름
      partialize: (state) => ({ sidebarOpen: state.sidebarOpen }), // 사이드바 상태만 persist
    }
  )
);
