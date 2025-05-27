import { createContext, useContext } from "react";
import data from "./data.json";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
	return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
