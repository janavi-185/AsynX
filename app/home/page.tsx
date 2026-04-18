import Link from "next/link";
import Navbar from "@/components/navbar";

const page = () => {
  return (
    <section className="flex h-screen w-full flex-col overflow-hidden bg-[#edf1f6] dark:bg-[#0F1425]">
      <Navbar />
      
      <div className="flex flex-1 items-center justify-center p-6 text-center">
        <div className=" space-y-6">
          <h1 className="text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-7xl">
            Welcome to <span className="text-[#3b7bff]">Koin</span><span className="text-[#ff9f1a] italic">X</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Easily manage your crypto taxes and optimize your portfolio securely.
          </p>
          <div className="pt-10">
            <Link
              href="/koinX"
              className="inline-flex items-center justify-center rounded-lg bg-[#3b7bff] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-900/20 transition-all hover:bg-blue-600 focus:outline-hidden active:scale-95"
            >
              Go to Tax Harvesting Dashboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default page
