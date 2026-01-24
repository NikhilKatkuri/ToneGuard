import Image from "next/image";

const Sidebar = () => {
  return (
    <aside className="max-lg:hidden group w-16 hover:w-72 py-3 duration-200 cursor-e-resize  h-svh box-content transition-[left,right,width] ease-linear  start-0   ">
      <div className="h-full w-full grid grid-cols-1 grid-rows-2 gap-6">
        <div className="h-full flex flex-col  shrink-0 px-3  items-center gap-3 w-full">
          <button className="w-full px-1 h-10 flex items-center rounded-md hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors">
            <Image
              src="/favicon.ico"
              alt="Sidebar Image"
              width={36}
              height={36}
            />
          </button>
          <button className="p-2 h-10 flex items-center gap-3 rounded-full bg-stone-50 border border-stone-200  transition-colors w-full">
            <div className="h-10 w-auto rounded-full flex items-center justify-center ">
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
            </div>
            <span className="hidden group-hover:inline">Search</span>
            <span className="sr-only">Toggle Sidebar</span>
          </button>
        </div>
        <div className="flex flex-col "></div>
      </div>
    </aside>
  );
};

export default Sidebar;
