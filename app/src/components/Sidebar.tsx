"use client";

import cn from "@/lib/utlis";
import { forwardRef } from "react";

type SidebarProps = React.HTMLAttributes<HTMLDivElement>;

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(({ className, ...props }, ref) => {
    const dcn =
        "max-lg:hidden group w-16 duration-200 cursor-e-resize  h-full box-content transition-[width] duration-200 ease-linear  start-0";
    return <aside ref={ref} {...props} className={cn(dcn, className ?? "")}></aside>;
});

Sidebar.displayName = "Sidebar";

export default Sidebar;
