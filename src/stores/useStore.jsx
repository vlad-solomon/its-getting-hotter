import { create } from "zustand";

export const useStore = create((set) => ({
	selectedYear: null,
	setSelectedYear: (selectedYear) => set(() => ({ selectedYear })),
}));
