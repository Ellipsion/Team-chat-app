import { ChevronDown } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-full">
      <div className="hidden md:flex flex-col h-full w-60 fixed inset-y-0 z-20 border-l dark:border-none dark:bg-[#2B2D31] bg-[#f9fafa]">
        <div className=" h-12 w-full px-3 flex items-center border-neutral-200 dark:border-neutral-800 border-b dark:border-b-2">
          <div className="bg-primary/30 w-1/2 h-4 rounded animate-pulse" />
          <ChevronDown className="h-5 w-5 ml-auto" />
        </div>
      </div>
      <main className="md:pl-60 h-full"></main>
    </div>
  );
}
