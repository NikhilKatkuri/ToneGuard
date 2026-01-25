"use client";
import Sidebar from "@/components/Sidebar";
import cn from "@/lib/utlis";
import { createContext, useContext, useState, ReactNode, useLayoutEffect } from "react";

interface SideBarContextType {
    // state to track if sidebar is open or closed
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;

    isDesktop: boolean;
}

const SideBarContext = createContext<SideBarContextType | undefined>(undefined);

export const SideBarProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isDesktop, setIsDesktop] = useState<boolean>(true);

    useLayoutEffect(() => {
        const handler = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };
        window.addEventListener("resize", handler);
        handler();
        return () => window.removeEventListener("resize", handler);
    }, []);

    if (!isDesktop) {
        const dnc = "fixed top-0  h-full z-50";
        return (
            <SideBarContext.Provider value={{ isOpen, setIsOpen, isDesktop }}>
                <div className="bg-primary-background relative h-svh font-sans">
                    <div
                        className={cn(
                            dnc,
                            isOpen ? "left-0" : "-left-125",
                            "transition-width z-50 duration-300",
                        )}
                    >
                        <Sidebar className={"w-80"} />
                    </div>
                    {children}
                </div>
            </SideBarContext.Provider>
        );
    }

    return (
        <SideBarContext.Provider value={{ isOpen, setIsOpen, isDesktop }}>
            <div className="bg-primary-background grid h-svh grid-cols-1 font-sans lg:grid-cols-[auto_1fr]">
                <Sidebar className={isOpen ? "w-80" : "w-18"} isCollapsed={!isOpen} />
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
