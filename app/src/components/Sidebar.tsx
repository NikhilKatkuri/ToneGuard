"use client";

import cn from "@/lib/utlis";
import { forwardRef } from "react";
import SidebarTrigger from "./sidebar_trigger";

type SidebarProps = React.HTMLAttributes<HTMLDivElement> & {
    isCollapsed?: boolean;
};

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
    ({ className, isCollapsed = false, ...props }, ref) => {
        const dcn =
            "duration-200 bg-secondary-background font-sans h-full box-content transition-[width] duration-200 ease-linear  start-0  border-r border-zinc-200/70";
        return (
            <aside ref={ref} {...props} className={cn(dcn, className ?? "")}>
                <div className="flex h-full w-full flex-col justify-center">
                    <div className="h-full w-full px-3 py-2 max-lg:px-2 max-lg:pt-0">
                        <ul className="flex h-auto flex-col">
                            <li
                                className={cn(
                                    "group flex max-w-12 items-center rounded-full p-3 text-sm font-medium",
                                    "cursor-pointer text-zinc-700 hover:bg-zinc-200/50 hover:text-zinc-900",
                                    "transition-colors",
                                    "hover:bg-zinc-200/50 hover:text-zinc-900",
                                    "active:bg-zinc-200/60 active:text-zinc-900",
                                )}
                            >
                                <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                                    <SidebarTrigger />
                                </div>
                            </li>
                            <li
                                className={cn(
                                    "group mt-4 flex items-center rounded-full p-3 text-sm font-medium",
                                    "cursor-pointer text-zinc-700",
                                    "transition-colors",
                                    "hover:bg-zinc-200/50 hover:text-zinc-900",
                                    "active:bg-zinc-200/60 active:text-zinc-900",
                                )}
                            >
                                <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                        />
                                    </svg>
                                </div>

                                <span
                                    className={cn(
                                        "ml-3 whitespace-nowrap",
                                        "transition-[opacity,transform,width] duration-200 ease-out",
                                        isCollapsed
                                            ? "pointer-events-none w-0 -translate-x-2 opacity-0"
                                            : "w-auto translate-x-0 opacity-100",
                                    )}
                                >
                                    New Chat
                                </span>
                                <span
                                    className={cn(
                                        "ml-auto hidden rounded-xl px-2 font-mono text-xs whitespace-nowrap group-hover:block",
                                        "transition-[opacity,transform] duration-200 ease-out",
                                        isCollapsed
                                            ? "pointer-events-none translate-x-2 opacity-0"
                                            : "translate-x-0 opacity-100",
                                    )}
                                >
                                    Ctrl + N
                                </span>
                            </li>
                            <li
                                className={cn(
                                    "group flex items-center rounded-full p-3 text-sm font-medium",
                                    "cursor-pointer text-zinc-700",
                                    "transition-colors",
                                    "hover:bg-zinc-200/50 hover:text-zinc-900",
                                    "active:bg-zinc-200/60 active:text-zinc-900",
                                )}
                            >
                                <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                        />
                                    </svg>
                                </div>

                                <span
                                    className={cn(
                                        "ml-3 whitespace-nowrap",
                                        "transition-[opacity,transform,width] duration-200 ease-out",
                                        isCollapsed
                                            ? "pointer-events-none w-0 -translate-x-2 opacity-0"
                                            : "w-auto translate-x-0 opacity-100",
                                    )}
                                >
                                    Search
                                </span>
                                <span
                                    className={cn(
                                        "ml-auto hidden rounded-xl px-2 font-mono text-xs whitespace-nowrap group-hover:block",
                                        "transition-[opacity,transform] duration-200 ease-out",
                                        isCollapsed
                                            ? "pointer-events-none translate-x-2 opacity-0"
                                            : "translate-x-0 opacity-100",
                                    )}
                                >
                                    Ctrl + K
                                </span>
                            </li>
                            <li
                                className={cn(
                                    "group flex items-center rounded-full p-3 text-sm font-medium",
                                    "cursor-pointer text-zinc-700",
                                    "transition-colors",
                                    "hover:bg-zinc-200/50 hover:text-zinc-900",
                                    "active:bg-zinc-200/60 active:text-zinc-900",
                                )}
                            >
                                <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className={cn(
                                            "size-5",
                                            !isCollapsed ? "group-hover:hidden" : "",
                                        )}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                        />
                                    </svg>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className={cn(
                                            "size-5",
                                            !isCollapsed ? "hidden group-hover:block" : "hidden",
                                        )}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                        />
                                    </svg>
                                </div>

                                <span
                                    className={cn(
                                        "ml-3 whitespace-nowrap",
                                        "transition-[opacity,transform,width] duration-200 ease-out",
                                        isCollapsed
                                            ? "pointer-events-none w-0 -translate-x-2 opacity-0"
                                            : "w-auto translate-x-0 opacity-100",
                                    )}
                                >
                                    History
                                </span>
                                <span
                                    className={cn(
                                        "ml-auto hidden rounded-xl px-2 font-mono text-xs whitespace-nowrap group-hover:block",
                                        "transition-[opacity,transform] duration-200 ease-out",
                                        isCollapsed
                                            ? "pointer-events-none translate-x-2 opacity-0"
                                            : "translate-x-0 opacity-100",
                                    )}
                                >
                                    Ctrl + H
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="h-full w-full flex-col px-3 py-4 max-lg:px-2">
                        <ul className="flex h-full flex-col justify-end">
                            <li
                                className={cn(
                                    "group flex items-center rounded-full p-3 text-sm font-medium",
                                    "cursor-pointer text-zinc-700",
                                    "transition-colors",
                                    "hover:bg-zinc-200/50 hover:text-zinc-900",
                                    "active:bg-zinc-200/60 active:text-zinc-900",
                                )}
                            >
                                <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                    </svg>
                                </div>

                                <span
                                    className={cn(
                                        "ml-3 whitespace-nowrap",
                                        "transition-[opacity,transform,width] duration-200 ease-out",
                                        isCollapsed
                                            ? "pointer-events-none w-0 -translate-x-2 opacity-0"
                                            : "w-auto translate-x-0 opacity-100",
                                    )}
                                >
                                    Settings
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </aside>
        );
    },
);

Sidebar.displayName = "Sidebar";

export default Sidebar;
