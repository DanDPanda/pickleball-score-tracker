import { useContext } from "react";
import { DataContext } from "../contexts/DataContext";
import type { Data } from "../types/Data";

export const useData = (): Data => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
