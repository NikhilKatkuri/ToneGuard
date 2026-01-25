"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ValueType = string;

interface SuperContextType {
    value: ValueType;
    setValue: (val: ValueType) => void;
}

const SuperContext = createContext<SuperContextType | undefined>(undefined);

export const SuperProvider = ({ children }: { children: ReactNode }) => {
    const [value, setValue] = useState<ValueType>("");
    return <SuperContext.Provider value={{ value, setValue }}>{children}</SuperContext.Provider>;
};

export const useSuper = () => {
    const context = useContext(SuperContext);
    if (!context) throw new Error("useSuper must be used within SuperProvider");
    return context;
};
