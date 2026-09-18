export default function Loading() {
  return (
    <div className="min-h-screen bg-[#09090d] px-5 pt-36 text-white">
      <div className="page-shell animate-pulse">
        <div className="h-5 w-40 rounded-full bg-white/[0.06]" />
        <div className="mt-8 h-24 max-w-4xl rounded-3xl bg-white/[0.05] sm:h-40" />
        <div className="mt-7 h-5 max-w-2xl rounded-full bg-white/[0.04]" />
        <div className="mt-3 h-5 max-w-xl rounded-full bg-white/[0.04]" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => <div key={index} className="h-72 rounded-[2rem] border border-white/[0.06] bg-white/[0.025]" />)}
        </div>
      </div>
    </div>
  );
}
