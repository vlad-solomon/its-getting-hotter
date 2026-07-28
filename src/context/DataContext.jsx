import { createContext } from "react";
import data from "./data.json";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
	return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
