"use client";
import cn from "@/lib/utlis";
import { useState } from "react";

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-zinc-700">{label}</label>
        {children}
    </div>
);

const input = cn(
    "h-11 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm ",
    "placeholder:text-zinc-400 outline-none transition ",
    "focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200",
);

const KeyView = () => {
    const [showKey, setShowKey] = useState<boolean>(false);
    return (
        <div className="grid gap-6 border-t border-zinc-200 py-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Provider">
                    <input type="text" placeholder="OpenAI / Gemini / Ollama" className={input} />
                </Field>

                <Field label="Model name">
                    <input type="text" placeholder="gpt-4o / gemini-pro" className={input} />
                </Field>
            </div>

            <Field label="API Key">
                <div className="relative">
                    <input
                        type={showKey ? "text" : "password"}
                        placeholder="sk-••••••••••••••"
                        className={input + " pr-12"}
                    />
                    <button
                        type="button"
                        onClick={() => {
                            setShowKey((prev) => !prev);
                        }}
                        className="absolute inset-y-0 right-2 my-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-xs text-zinc-600 hover:bg-zinc-100"
                    >
                        {showKey ? (
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
                                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                            </svg>
                        ) : (
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
                                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </Field>
        </div>
    );
};

interface ApiKeys {
    id: number;
    provider: string;
    modelName: string;
    apiKey: string;
}

const Api = () => {
    const [buckets, setBuckets] = useState<ApiKeys[]>([]);
    return (
        <div className="h-full max-h-96 w-full overflow-y-auto pr-3">
            <div className="grid h-auto w-full grid-cols-1 grid-rows-[24px_auto_auto] gap-3">
                <h1 className="font-medium">API Settings</h1>
                <div className="">
                    {[...new Array(buckets.length)].map((_, idx) => (
                        <KeyView key={idx} />
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-between">
                {buckets.length === 0 && (
                    <p className="mt-4 text-sm text-zinc-500">No API keys added yet.</p>
                )}
                <button
                    type="button"
                    onClick={() => {
                        setBuckets((prev) => {
                            const last = prev[prev.length - 1];
                            if (!last)
                                return [
                                    ...prev,
                                    { id: Date.now(), provider: "", modelName: "", apiKey: "" },
                                ];

                            if (
                                last.provider === "" ||
                                last.modelName === "" ||
                                last.apiKey === ""
                            ) {
                                alert(
                                    "Please fill in the existing API key details before adding a new one.",
                                );
                                return prev;
                            }
                            return [
                                ...prev,
                                { id: Date.now(), provider: "", modelName: "", apiKey: "" },
                            ];
                        });
                    }}
                    className="mt-4 rounded-md bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-200"
                >
                    Add API Key
                </button>
            </div>
        </div>
    );
};

export default Api;
