"use client";
import cn from "@/lib/utlis";
import { useSideBar } from "@/providers/Sidebar";

type SidebarTriggerProps = React.HTMLAttributes<HTMLButtonElement>;

const SidebarTrigger = ({ ...props }: SidebarTriggerProps) => {
    const { isOpen, setIsOpen } = useSideBar();
    const dnc =
        "cursor-pointer rounded-full bg-transparent p-2 transition-colors duration-200 ease-in-out hover:bg-gray-200 active:bg-gray-200";
    return (
        <button
            onClick={() => {
                setIsOpen(!isOpen);
            }}
            {...props}
            className={cn(dnc, props.className ?? " ")}
        >
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
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
            </svg>
        </button>
    );
};

export default SidebarTrigger;
