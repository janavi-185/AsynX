import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center border-b border-slate-200 bg-white px-4 py-4 dark:border-[#2C3B6E]/30 dark:bg-[#161C2D] sm:px-10">
      <div className="inline-flex items-start gap-px text-[24px] sm:text-[34px] leading-none font-bold tracking-tight">
        <span className="text-[#3b7bff]">Koin</span>
        <span className="text-[#ff9f1a] -ml-0.5 pr-1 font-extrabold italic">X</span>
        <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">TM</span>
      </div>
      
      <button type="button" className="sm:hidden text-slate-700 dark:text-slate-200 p-1">
        <Menu className="size-6" />
      </button>
    </div>
  );
}
