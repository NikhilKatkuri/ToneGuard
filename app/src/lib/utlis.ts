import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// class names utility function
const cn = (...inputs: string[]): string => {
    return twMerge(clsx(...inputs));
};

export default cn;
