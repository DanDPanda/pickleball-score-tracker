import { createContext } from "react";
import type { Data } from "../types/Data";

export const DataContext = createContext<Data | undefined>(undefined);