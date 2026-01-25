import cn from "@/lib/utlis";

const HistoryDialog = () => {
    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className="mx-auto grid h-auto w-full grid-rows-[48px_auto_48px] rounded-t-3xl bg-white px-6 py-2 max-md:pt-12 md:h-140 md:rounded-3xl lg:max-w-4xl"
        >
            <div className="flex items-center justify-between border-b border-zinc-300">
                <input type="text" placeholder="search..." className="w-full outline-0" />
                <button>
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
                </button>
            </div>
            <div className="flex items-center justify-center">
                <span>No Conversation available</span>
            </div>
            <div className="flex items-center justify-between border-t border-zinc-300">
                <div className=""></div>
                <div className="flex items-center justify-end">
                    <button
                        type="button"
                        className={cn(
                            "group inline-flex items-center gap-2 rounded-xl px-3 py-2",
                            "text-sm text-black/80",
                            "hover:bg-zinc-200/50",
                            "focus-visible:ring-2 focus-visible:ring-zinc-400/50 focus-visible:outline-none",
                            "transition",
                            "cursor-pointer",
                        )}
                    >
                        <span>Go</span>

                        <kbd
                            className={cn(
                                "rounded border border-zinc-300 bg-white px-1.5 py-0.5",
                                "font-mono text-[11px] text-black/70",
                                "group-hover:bg-zinc-100",
                            )}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-3"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499"
                                />
                            </svg>
                        </kbd>
                    </button>
                    <button
                        type="button"
                        className={cn(
                            "group inline-flex items-center gap-2 rounded-xl px-3 py-2",
                            "text-sm text-black/80",
                            "hover:bg-zinc-200/50",
                            "focus-visible:ring-2 focus-visible:ring-zinc-400/50 focus-visible:outline-none",
                            "transition",
                            "cursor-pointer",
                        )}
                    >
                        <span>Edit</span>

                        <kbd
                            className={cn(
                                "rounded border border-zinc-300 bg-white px-1.5 py-0.5",
                                "font-mono text-[11px] text-black/70",
                                "group-hover:bg-zinc-100",
                            )}
                        >
                            Ctrl&nbsp;+&nbsp;E
                        </kbd>
                    </button>
                    <button
                        type="button"
                        className={cn(
                            "group inline-flex items-center gap-2 rounded-xl px-3 py-2",
                            "text-sm text-black/80",
                            "hover:bg-zinc-200/50",
                            "focus-visible:ring-2 focus-visible:ring-zinc-400/50 focus-visible:outline-none",
                            "transition",
                            "cursor-pointer",
                        )}
                    >
                        <span>Delete</span>

                        <kbd
                            className={cn(
                                "rounded border border-zinc-300 bg-white px-1.5 py-0.5",
                                "font-mono text-[11px] text-black/70",
                                "group-hover:bg-zinc-100",
                            )}
                        >
                            Ctrl&nbsp;+&nbsp;D
                        </kbd>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HistoryDialog;
