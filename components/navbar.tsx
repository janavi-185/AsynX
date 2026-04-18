export default function Navbar() {
  return (
    <div className="flex items-center border-b border-slate-200 bg-white px-6 py-3 dark:border-slate-700 dark:bg-slate-900 sm:px-10">
      <div className="inline-flex items-start gap-0.5 text-[38px] leading-none font-extrabold tracking-tight">
        <span className="text-[#1e67ff]">Koin</span>
        <span className="text-[#ff9f1a]">X</span>
        <span className="pt-0.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500">R</span>
      </div>
    </div>
  );
}
