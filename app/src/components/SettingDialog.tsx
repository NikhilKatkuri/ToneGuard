// api, models, instruction, memory

import { useState } from "react";
import Instructions from "./settings/Instructions";
import Api from "./settings/Api";

/**
 * type of apis - provider:gemini, openai, ollama url -modelname:string, key: api key,
 * type of models - model list from apis
 * instruction - custom instructions for the model
 * memory - conversation memory settings
 */

type opts = "API" | "Instruction" | "Memory";

const opts: Record<opts, { name: string; component: React.ReactNode; Icon: React.ElementType }> = {
    API: {
        name: "APIs",
        component: <Api />,
        Icon: () => (
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
                    d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z"
                />
            </svg>
        ),
    },
    Instruction: {
        name: "Instruction",
        component: <Instructions />,
        Icon: () => (
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
                    d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                />
            </svg>
        ),
    },
    Memory: {
        name: "Memory",
        component: <div>Memory Settings Component</div>,
        Icon: () => (
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
                    d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                />
            </svg>
        ),
    },
};

const getTab = (opt: opts | undefined) => {
    if (!opt) return <div className="mt-10 text-center text-gray-500">Select a setting option</div>;
    return opts[opt].component;
};

const SettingDialog = () => {
    const [selectedOpt, setSelectedOpt] = useState<opts | undefined>(undefined);
    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className="mx-auto min-h-120 w-full rounded-t-3xl bg-white p-4 py-6 max-md:pt-12 md:max-w-4xl md:rounded-3xl lg:p-6"
        >
            <p className="text-lg font-medium">Settings</p>
            <div className="mt-4 flex h-full w-full flex-1 grid-cols-1 md:grid md:grid-cols-[220px_auto] md:gap-6">
                <div className="flex w-full flex-col gap-2">
                    {Object.entries(opts).map(([key, { name, Icon }]) => (
                        <div
                            key={key}
                            className={`flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 hover:bg-gray-300/30 ${
                                selectedOpt === key ? "bg-gray-300/30 font-medium" : ""
                            }`}
                            onClick={() => setSelectedOpt(key as opts)}
                        >
                            <Icon />
                            <span>{name}</span>
                        </div>
                    ))}
                </div>
                <div className="hidden flex-1 flex-col gap-4 md:flex">{getTab(selectedOpt)}</div>
            </div>
        </div>
    );
};

export default SettingDialog;
