"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Award, ExternalLink, Quote, Star, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Certificate, Testimonial } from "@/lib/types";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || testimonials.length < 2) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % testimonials.length), 5200);
    return () => window.clearInterval(timer);
  }, [paused, testimonials.length]);

  if (!testimonials.length) return null;
  const current = testimonials[active];
  return (
    <section className="section-pad relative z-10">
      <div className="page-shell">
        <SectionHeading eyebrow="Client feedback" title="Trust is built in the details." />
        <Reveal className="mt-12" delay={0.08}>
          <div className="testimonial-stage" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <Quote className="absolute right-7 top-7 text-violet-300/20" size={70} />
            <AnimatePresence mode="wait">
              <motion.div key={current.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.45 }}>
                <div className="mb-7 flex gap-1">{Array.from({ length: current.rating }).map((_, index) => <Star key={index} size={16} className="fill-amber-300 text-amber-300" />)}</div>
                <blockquote className="max-w-4xl text-2xl font-medium leading-[1.45] tracking-[-0.025em] text-white sm:text-4xl">“{current.review}”</blockquote>
                <div className="mt-9"><strong className="block text-white">{current.client_name}</strong><span className="mt-1 block text-sm text-white/40">{current.company}</span></div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-7 right-7 flex gap-2">
              <button className="rail-button" type="button" onClick={() => setActive((active - 1 + testimonials.length) % testimonials.length)} aria-label="Previous testimonial"><ArrowLeft size={17} /></button>
              <button className="rail-button" type="button" onClick={() => setActive((active + 1) % testimonials.length)} aria-label="Next testimonial"><ArrowRight size={17} /></button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function CertificatesSection({ certificates }: { certificates: Certificate[] }) {
  const [selected, setSelected] = useState<Certificate | null>(null);
  if (!certificates.length) return null;

  return (
    <section className="section-pad relative z-10">
      <div className="page-shell">
        <SectionHeading eyebrow="Certificates" title="Learning that strengthens the work." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate, index) => (
            <Reveal key={certificate.id} delay={index * 0.05}>
              <button type="button" className="certificate-card group w-full text-left" onClick={() => setSelected(certificate)} data-cursor="EXPLORE">
                <div className="grid aspect-[16/10] place-items-center rounded-2xl border border-white/[0.07] bg-[radial-gradient(circle_at_50%_35%,rgba(139,109,255,.18),transparent_45%)]">
                  <Award size={54} className="text-violet-300/65 transition group-hover:scale-110" />
                </div>
                <div className="p-5"><h3 className="font-semibold text-white">{certificate.title}</h3><p className="mt-2 text-sm text-white/40">{certificate.issuer} · {certificate.year}</p></div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected ? (
          <motion.div className="fixed inset-0 z-[120] grid place-items-center bg-black/80 p-5 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <motion.div className="relative w-full max-w-3xl rounded-[2rem] border border-white/10 bg-[#111118] p-6 sm:p-10" initial={{ scale: 0.9, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 15 }} onClick={(event) => event.stopPropagation()}>
              <button type="button" className="mini-action absolute right-5 top-5" onClick={() => setSelected(null)} aria-label="Close certificate"><X size={17} /></button>
              <div className="grid aspect-[16/9] place-items-center rounded-2xl border border-white/10 bg-[radial-gradient(circle,rgba(139,109,255,.2),transparent_55%)]"><Award size={80} className="text-violet-300" /></div>
              <h3 className="mt-6 text-2xl font-semibold text-white">{selected.title}</h3>
              <p className="mt-2 text-white/45">{selected.issuer} · {selected.year}</p>
              {selected.credential_url ? <Link className="secondary-button mt-6 inline-flex" href={selected.credential_url} target="_blank">View credential <ExternalLink size={16} /></Link> : null}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
