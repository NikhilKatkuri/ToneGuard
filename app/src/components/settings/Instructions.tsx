import cn from "@/lib/utlis";
import React, { useState } from "react";

interface Instructions {
    type: "custom" | "formal" | "casual" | "friendly" | "professional" | "humorous";
    description: string;
    instruction: string;
}

export const INSTRUCTIONS: Instructions[] = [
    {
        type: "custom",
        description: "Fully user-controlled behavior",
        instruction:
            "Follow the user's instructions precisely. Adapt tone, depth, and style based on their explicit preferences. Do not assume defaults. Prioritize accuracy and intent over politeness.",
    },
    {
        type: "formal",
        description: "Structured and professional tone",
        instruction:
            "Respond in a formal and professional manner. Use complete sentences, neutral language, and avoid slang, emojis, or casual expressions. Focus on clarity, correctness, and structure.",
    },
    {
        type: "casual",
        description: "Relaxed, conversational responses",
        instruction:
            "Respond in a casual, relaxed tone. Use simple language, contractions, and light conversational phrasing. Keep it friendly and easy to understand without being unprofessional.",
    },
    {
        type: "friendly",
        description: "Warm and supportive tone",
        instruction:
            "Respond in a friendly and supportive tone. Be encouraging, empathetic, and approachable. Use light positivity where appropriate, but avoid exaggeration or forced enthusiasm.",
    },
    {
        type: "professional",
        description: "Direct and work-focused",
        instruction:
            "Respond like a professional colleague. Be concise, practical, and solution-oriented. Avoid unnecessary explanations or humor. Focus on actionable, work-relevant answers.",
    },
    {
        type: "humorous",
        description: "Helpful with light humor",
        instruction:
            "Respond with light, tasteful humor when appropriate, while still providing accurate and helpful information. Avoid sarcasm that could be misinterpreted or offensive.",
    },
];

interface InstrButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    instruction: Instructions;
    active: "true" | "false";
}

const InstrButton = ({ instruction, ...props }: InstrButtonProps) => {
    return (
        <button
            {...props}
            className={cn(
                "flex cursor-pointer items-center justify-between rounded-xl border border-zinc-300 p-3 hover:bg-zinc-200/50",
                props.className ?? "",
                props.active === "true" ? "bg-zinc-200/50" : "",
            )}
        >
            <div className="flex flex-col items-start gap-1 text-left">
                <h1 className="font-medium">
                    {instruction.type.charAt(0).toUpperCase() + instruction.type.slice(1)}
                </h1>
                <p className="text-sm text-black/50"> {instruction.description}</p>
            </div>
            <div className={cn("ml-2", props.active === "true" ? "" : "opacity-0")}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-4"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
            </div>
        </button>
    );
};

const Instructions = () => {
    const [chosenInstruction, setChosenInstruction] = useState<Instructions>(INSTRUCTIONS[0]);

    return (
        <div className="h-full max-h-96 w-full overflow-y-scroll pr-3">
            <div className="grid h-120 w-full grid-cols-1 grid-rows-[24px_auto_auto] gap-3">
                <h1 className="font-medium">Customize Toneguard&apos;s Response</h1>
                <div className="mt-3 grid h-full w-full grid-cols-2 gap-3">
                    {INSTRUCTIONS.map((instruction) => (
                        <InstrButton
                            onClick={() => {
                                setChosenInstruction(instruction);
                            }}
                            active={chosenInstruction.type === instruction.type ? "true" : "false"}
                            key={instruction.type}
                            instruction={instruction}
                        />
                    ))}
                </div>
                <div className="my-3 flex flex-col gap-3">
                    <h1 className="font-medium">Custom Instructions</h1>
                    <textarea
                        value={chosenInstruction.instruction}
                        onChange={(e) => {
                            setChosenInstruction((prev) => ({
                                ...prev,
                                instruction: e.target.value,
                            }));
                        }}
                        className="h-24 rounded-xl border border-zinc-300 p-2 outline-0"
                        style={{ resize: "none" }}
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default Instructions;
