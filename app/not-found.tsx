import Link from "next/link";
import { ArrowLeft, FolderSearch } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#09090d] px-5 text-white">
      <div className="background-grid absolute inset-0 opacity-50" />
      <div className="absolute left-1/2 top-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/15 blur-3xl" />
      <div className="relative max-w-2xl text-center">
        <FolderSearch className="mx-auto mb-7 text-teal-300" size={42} />
        <p className="font-mono text-xs uppercase tracking-[.28em] text-white/35">Error 404</p>
        <h1 className="mt-5 font-display text-[clamp(3.5rem,10vw,8rem)] font-semibold leading-[.88] tracking-[-.065em]">This page escaped the codebase.</h1>
        <p className="mx-auto mt-6 max-w-lg text-base leading-7 text-white/45">The route may have moved, or the project is no longer published.</p>
        <Link href="/" className="primary-button mt-9"><ArrowLeft size={17} /> Go home</Link>
      </div>
    </main>
  );
}
