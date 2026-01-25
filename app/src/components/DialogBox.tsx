// import cn from "@/lib/utlis";
// import React from "react";

// interface DialogBoxProps extends React.HTMLAttributes<HTMLDivElement> {
//     children?: React.ReactNode;
//     isOpen?: boolean;
//     onClose: () => void;
//     bgBlur?: boolean;
//     showCloseButton?: boolean;
// }

// const DialogBox = ({
//     bgBlur = false,
//     showCloseButton = true,
//     isOpen = false,
//     onClose,
//     ...props
// }: DialogBoxProps) => {
//     const dn = "fixed top-0 left-0 z-60 flex h-screen w-screen items-center justify-center ";
//     if (!isOpen) return null;

//     return (
//         <div
//             {...props}
//             onClick={onClose}
//             className={cn(
//                 dn,
//                 props.className ?? "",
//                 bgBlur ? "bg-zinc-200/40 backdrop-blur-sm" : "bg-zinc-700/10",
//             )}
//         >
//             {showCloseButton && (
//                 <div className="absolute top-4 right-4">
//                     <button
//                         onClick={onClose}
//                         className={cn(
//                             "group flex items-center rounded-full p-3 text-sm font-medium",
//                             "cursor-pointer text-zinc-700",
//                             "transition-colors",
//                             "hover:bg-zinc-200/50 hover:text-zinc-900",
//                             "active:bg-zinc-200/60 active:text-zinc-900",
//                         )}
//                     >
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             strokeWidth={1.5}
//                             stroke="currentColor"
//                             className="size-6"
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="M6 18 18 6M6 6l12 12"
//                             />
//                         </svg>
//                     </button>
//                 </div>
//             )}
//             <div className="relative flex h-full w-full flex-col items-center justify-end transition-transform duration-300 ease-out md:justify-center">
//                 {props.children}
//             </div>
//         </div>
//     );
// };

// export default DialogBox;
import cn from "@/lib/utlis";
import React from "react";

interface DialogBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    isOpen?: boolean;
    onClose: () => void;
    bgBlur?: boolean;
    showCloseButton?: boolean;
}

const DialogBox = ({
    bgBlur = false,
    showCloseButton = true,
    isOpen = false,
    onClose,
    children,
    className,
    ...props
}: DialogBoxProps) => {
    if (!isOpen) return null;

    return (
        <div
            onClick={onClose}
            className={cn(
                "fixed inset-0 z-60 flex",
                bgBlur ? "bg-zinc-200/40 backdrop-blur-sm" : "bg-zinc-700/10",
            )}
        >
            <div className="relative flex h-full w-full flex-col items-center justify-end md:justify-center">
                {showCloseButton && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 rounded-full p-3 text-zinc-700 transition-colors hover:bg-zinc-200/50 hover:text-zinc-900 active:bg-zinc-200/60"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                )}

                <div {...props} className={cn(`w-full overflow-hidden`, className ?? " ")}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DialogBox;
