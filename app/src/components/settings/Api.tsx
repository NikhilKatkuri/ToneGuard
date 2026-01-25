"use client";

const Api = () => {
    return (
        <div className="h-full max-h-full w-full overflow-y-auto pr-3">
            <div className="grid h-auto min-h-120 w-full grid-cols-1 grid-rows-[24px_auto_32px] gap-3">
                <h1 className="font-medium">API Settings</h1>
            </div>
            <div className="flex items-center justify-between">
                <button
                    type="button"
                    onClick={() => {}}
                    className="mt-4 rounded-md bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-200"
                >
                    Add API Key
                </button>
            </div>
        </div>
    );
};

export default Api;
