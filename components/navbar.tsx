export default function Navbar() {
  return (
    <div className="flex justify-start items-center border-b border-slate-200 bg-white px-6 py-4 dark:border-[#2C3B6E]/30 dark:bg-[#0B0E14] sm:px-10">
      <div className="inline-flex items-start gap-px text-[26px] sm:text-[34px] leading-none font-bold tracking-tight">
        <span className="text-[#3b7bff]">Koin</span>
        <span className="text-[#ff9f1a] -ml-[2px] pr-1 font-extrabold italic">X</span>
        <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">TM</span>
      </div>
    </div>
  );
}
