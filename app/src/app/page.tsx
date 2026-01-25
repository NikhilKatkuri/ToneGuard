"use client";
import ChatInput from "@/components/ChatInput";
import SidebarTrigger from "@/components/sidebar_trigger";

export default function Home() {
    return (
        <main className="bg-primary-background grid h-full w-full grid-cols-1 grid-rows-[48px_auto] p-2">
            <nav className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <SidebarTrigger className="lg:hidden" />
                    <p className="text-lg font-medium text-slate-800 sm:text-xl">ToneGuard</p>
                </div>
            </nav>
            <div className="flex h-full w-full items-center justify-center px-4">
                <ChatInput />
            </div>
        </main>
    );
}
