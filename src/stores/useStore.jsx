import { create } from "zustand";
import data from "./data.json";

export const useStore = create(() => ({
	data,
}));
