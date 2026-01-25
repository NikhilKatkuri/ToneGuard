"use client";
import Sidebar from "@/components/Sidebar";
import { createContext, useContext, useState, ReactNode } from "react";

interface SideBarContextType {
    // state to track if sidebar is open or closed
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBarContext = createContext<SideBarContextType | undefined>(undefined);

export const SideBarProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <SideBarContext.Provider value={{ isOpen, setIsOpen }}>
            <div className="bg-secondary-background dark:bg-primary-background grid h-screen grid-cols-1 font-sans lg:grid-cols-[auto_1fr]">
                <Sidebar />
                {children}
            </div>
        </SideBarContext.Provider>
    );
};

export const useSideBar = () => {
    const context = useContext(SideBarContext);
    if (!context) throw new Error("useSideBar must be used within SideBarProvider");
    return context;
};
