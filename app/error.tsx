"use client";

import { RotateCcw, TriangleAlert } from "lucide-react";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#09090d] p-5 text-center text-white">
      <div className="max-w-lg rounded-[2rem] border border-rose-400/15 bg-rose-400/[0.045] p-8">
        <TriangleAlert className="mx-auto text-rose-300" size={38} />
        <h1 className="mt-6 text-3xl font-semibold tracking-tight">Something did not load correctly.</h1>
        <p className="mt-3 text-sm leading-6 text-white/45">The page hit a recoverable error. Try the request again.</p>
        <button type="button" className="primary-button mt-7" onClick={reset}><RotateCcw size={17} /> Try again</button>
      </div>
    </main>
  );
}
