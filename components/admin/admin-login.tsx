"use client";

import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, LoaderCircle, LockKeyhole, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { getBrowserSupabase, isSupabaseConfigured } from "@/lib/supabase/client";

export function AdminLogin({ demoAllowed }: { demoAllowed: boolean }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const configured = isSupabaseConfigured();

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const supabase = getBrowserSupabase();
    if (!supabase) {
      setError("Supabase is not connected. Add the values from .env.example first.");
      setLoading(false);
      return;
    }
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: String(form.get("email") || ""),
      password: String(form.get("password") || ""),
    });
    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }
    router.replace("/admin");
    router.refresh();
  };

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#09090d] p-5 text-white">
      <div className="background-grid absolute inset-0 opacity-50" />
      <div className="absolute left-[12%] top-[5%] size-[28rem] rounded-full bg-violet-600/15 blur-3xl" />
      <div className="absolute bottom-[-15rem] right-[-7rem] size-[32rem] rounded-full bg-teal-300/10 blur-3xl" />

      <motion.div className="relative w-full max-w-md" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
        <Link href="/" className="mx-auto mb-7 flex w-fit items-center gap-3" aria-label="Back to portfolio">
          <span className="grid size-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.055] font-black">P<span className="text-teal-300">.</span></span>
          <span className="font-semibold">Portfolio CMS</span>
        </Link>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
          <span className="mb-7 grid size-12 place-items-center rounded-2xl border border-violet-400/20 bg-violet-400/[0.08] text-violet-300"><ShieldCheck size={22} /></span>
          <h1 className="text-3xl font-semibold tracking-[-0.04em]">Admin sign in</h1>
          <p className="mt-3 text-sm leading-6 text-white/42">Use the Supabase admin account created during setup. Public visitors cannot access this dashboard.</p>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <label className="form-field">
              <span>Email address</span>
              <input type="email" name="email" autoComplete="email" placeholder="admin@example.com" required disabled={!configured} />
            </label>
            <label className="form-field">
              <span>Password</span>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} name="password" autoComplete="current-password" placeholder="Your secure password" required disabled={!configured} className="pr-12" />
                <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/35 hover:text-white" aria-label={showPassword ? "Hide password" : "Show password"}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>
            {error ? <p className="rounded-xl border border-rose-400/20 bg-rose-400/[0.07] px-4 py-3 text-sm text-rose-200" role="alert">{error}</p> : null}
            {!configured ? <p className="rounded-xl border border-amber-300/20 bg-amber-300/[0.06] px-4 py-3 text-sm leading-6 text-amber-100">Backend setup is required. Follow README.md, then add your Supabase keys to .env.local.</p> : null}
            <button type="submit" className="primary-button w-full" disabled={loading || !configured}>
              {loading ? <LoaderCircle className="animate-spin" size={17} /> : <LockKeyhole size={17} />}
              {loading ? "Checking access..." : "Enter admin dashboard"}
            </button>
          </form>

          {demoAllowed ? (
            <Link href="/admin?demo=1" className="secondary-button mt-3 w-full">
              Open local dashboard preview <ArrowRight size={16} />
            </Link>
          ) : null}
        </div>
        <p className="mt-5 text-center text-xs text-white/25">Protected with Supabase Auth and Row Level Security.</p>
      </motion.div>
    </main>
  );
}
