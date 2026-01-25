import cn from "@/lib/utlis";
import React, { useRef } from "react";

const ChatInput = () => {
    const textareaRef = useRef(null);

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const el = e.currentTarget;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
    };

    const actionBtnClass = cn(
        "flex items-center rounded-full p-2 lg:px-3",
        "text-zinc-600 transition-all duration-200",
        "hover:bg-zinc-200/60 hover:text-zinc-900",
        "active:scale-95",
    );

    return (
        <div className="mx-auto w-full rounded-[28px] border border-zinc-200 bg-white p-2 shadow-sm transition-shadow focus-within:shadow-md lg:max-w-xl">
            <div className="flex flex-col">
                <textarea
                    ref={textareaRef}
                    rows={1}
                    onInput={handleInput}
                    placeholder="Type a message…"
                    className="max-h-64 w-full resize-none bg-transparent px-4 py-3 text-base leading-relaxed text-zinc-800 outline-none placeholder:text-zinc-500"
                />

                <div className="flex items-center justify-between px-1 pb-1">
                    <div className="flex gap-1">
                        <button className={actionBtnClass}>
                            <Settings2Icon />
                            <span className="ml-2 text-sm font-medium">Tools</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className={actionBtnClass}>
                            <CpuIcon />
                            <span className="ml-2 text-sm font-medium">Auto</span>
                        </button>

                        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-white transition-transform hover:scale-105 active:scale-95 disabled:opacity-50">
                            <ArrowUpIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Settings2Icon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-4"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
        />
    </svg>
);

const CpuIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-4"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"
        />
    </svg>
);

const ArrowUpIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className="size-4"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
    </svg>
);

export default ChatInput;
