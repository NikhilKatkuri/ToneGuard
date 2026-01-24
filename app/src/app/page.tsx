import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] h-screen bg-secondary-background font-sans dark:bg-primary-background">
      <Sidebar />
      <main className=" w-full h-full bg-primary-background z-10 p-2 border-l border-zinc-200/70"></main>
    </div>
  );
}
