"use client";

import Image from "next/image";
import gsap from "gsap";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Download,
  Globe2,
  Layers3,
} from "lucide-react";

import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import { MagneticLink } from "@/components/ui/magnetic-link";
import type { SiteSettings } from "@/lib/types";

/* =========================================================
   ROTATING HERO WORDS
========================================================= */

const rotatingWords = [
  "web applications",
  "admin systems",
  "creator platforms",
  "digital experiences",
  "business websites",
];

/* =========================================================
   TECH MARQUEE
========================================================= */

const tech = [
  "NEXT.JS",
  "REACT",
  "TYPESCRIPT",
  "SUPABASE",
  "TAILWIND",
  "GSAP",
  "FRAMER MOTION",
  "VERCEL",
];

/* =========================================================
   HERO IMAGE SLIDER
========================================================= */

const heroPhotos = [
  "/standing.png",
  "/sitting.png",
  "/sitting1.png",
] as const;

/* =========================================================
   HERO
========================================================= */

export function Hero({
  settings,
  projectCount,
}: {
  settings: SiteSettings;
  projectCount: number;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const [word, setWord] = useState(0);
  const [activePhoto, setActivePhoto] = useState(0);

  const reduceMotion = useReducedMotion();

  const animationsEnabled =
    settings.animationsEnabled && !reduceMotion;

  /* =======================================================
     ROTATING WORD
  ======================================================= */

  useEffect(() => {
    const timer = window.setInterval(() => {
      setWord(
        (value) =>
          (value + 1) %
          rotatingWords.length
      );
    }, 2600);

    return () =>
      window.clearInterval(timer);
  }, []);

  /* =======================================================
     GSAP INTRO
  ======================================================= */

  useEffect(() => {
    if (
      !animationsEnabled ||
      !rootRef.current
    ) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        ".hero-reveal",
        {
          y: 55,
          opacity: 0,
          filter: "blur(10px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.05,
          stagger: 0.095,
          delay: 0.35,
          ease: "power4.out",
        }
      );

      gsap.fromTo(
        ".hero-photo",
        {
          scale: 0.92,
          opacity: 0,
          y: 45,
          filter: "blur(8px)",
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.25,
          delay: 0.75,
          ease: "expo.out",
        }
      );
    }, rootRef);

    return () => context.revert();
  }, [animationsEnabled]);

  /* =======================================================
     HERO IMAGE AUTO SLIDER
  ======================================================= */

  useEffect(() => {
    if (heroPhotos.length <= 1) {
      return;
    }

    const slider = window.setInterval(() => {
      setActivePhoto(
        (current) =>
          (current + 1) % heroPhotos.length
      );
    }, 3200);

    return () => {
      window.clearInterval(slider);
    };
  }, []);

  return (
    <section
      id="home"
      ref={rootRef}
      className="
        relative
        flex
        min-h-screen
        items-center
        overflow-hidden
        bg-[#08080d]
        pt-28
      "
    >
      {/* =====================================================
          PREMIUM BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        {/* GRID */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.18]
            [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)]
            [background-size:70px_70px]
            [mask-image:linear-gradient(to_bottom,black,transparent_85%)]
          "
        />

        {/* VIOLET ORB */}

        <motion.div
          animate={
            animationsEnabled
              ? {
                  x: [0, 60, 0],
                  y: [0, -35, 0],
                  scale: [
                    1,
                    1.1,
                    1,
                  ],
                }
              : undefined
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -left-[15%]
            top-[5%]
            size-[520px]
            rounded-full
            bg-violet-600/[0.12]
            blur-[130px]
            sm:size-[720px]
          "
        />

        {/* TEAL ORB */}

        <motion.div
          animate={
            animationsEnabled
              ? {
                  x: [0, -50, 0],
                  y: [0, 45, 0],
                  scale: [
                    1,
                    1.12,
                    1,
                  ],
                }
              : undefined
          }
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -right-[20%]
            top-[25%]
            size-[500px]
            rounded-full
            bg-teal-400/[0.075]
            blur-[140px]
            sm:size-[680px]
          "
        />

        {/* TOP LIGHT */}

        <div
          className="
            absolute
            left-1/2
            top-0
            h-[250px]
            w-[70%]
            -translate-x-1/2
            bg-violet-400/[0.04]
            blur-[100px]
          "
        />

        {/* CENTER FADE */}

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_0%,#08080d_82%)]
          "
        />
      </div>

      {/* =====================================================
          HERO CONTENT
      ===================================================== */}

      <div
        className="
          page-shell
          relative
          z-10
          grid
          w-full
          items-center
          gap-16
          pb-20
          pt-8

          lg:grid-cols-[1.03fr_.97fr]
          lg:gap-12
          lg:pb-24
          lg:pt-12
        "
      >
        {/* ===================================================
            LEFT CONTENT
        =================================================== */}

        <div>
          {/* AVAILABILITY */}

          <div
            className={`
              hero-reveal
              mb-7
              inline-flex
              items-center
              gap-2.5
              rounded-full
              border
              border-teal-300/20
              bg-teal-300/[0.055]
              px-4
              py-2
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-teal-200
              shadow-[inset_0_1px_0_rgba(255,255,255,.05),0_10px_30px_rgba(45,212,191,.04)]
              backdrop-blur-xl

              sm:text-xs

              ${
                animationsEnabled
                  ? "opacity-0"
                  : "opacity-100"
              }
            `}
          >
            <span
              className="
                relative
                flex
                size-2
              "
            >
              <span
                className="
                  absolute
                  inline-flex
                  size-full
                  animate-ping
                  rounded-full
                  bg-teal-300
                  opacity-50
                "
              />

              <span
                className="
                  relative
                  inline-flex
                  size-2
                  rounded-full
                  bg-teal-300
                  shadow-[0_0_12px_rgba(94,234,212,.8)]
                "
              />
            </span>

            {settings.availability}
          </div>

          {/* EYEBROW */}

          <div
            className={`
              hero-reveal
              mb-5
              flex
              items-center
              gap-3

              ${
                animationsEnabled
                  ? "opacity-0"
                  : "opacity-100"
              }
            `}
          >
            <span
              className="
                h-px
                w-8
                bg-gradient-to-r
                from-violet-400
                to-transparent
              "
            />

            <p
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-white/40

                sm:text-sm
              "
            >
              {settings.heroEyebrow}
            </p>
          </div>

          {/* MAIN TITLE */}

          <h1
            className={`
              hero-reveal
              max-w-[900px]
              font-display
              text-[clamp(3.25rem,7vw,7.8rem)]
              font-semibold
              leading-[0.88]
              tracking-[-0.065em]
              text-white

              ${
                animationsEnabled
                  ? "opacity-0"
                  : "opacity-100"
              }
            `}
          >
            Digital ideas,

            <br />

            <span
              className="
                relative
                inline-block
                bg-gradient-to-r
                from-violet-300
                via-white
                to-teal-300
                bg-clip-text
                text-transparent
              "
            >
              built to move.

              <motion.span
                aria-hidden="true"
                animate={
                  animationsEnabled
                    ? {
                        scaleX: [
                          0,
                          1,
                          1,
                          0,
                        ],
                        x: [
                          "-100%",
                          "0%",
                          "0%",
                          "100%",
                        ],
                      }
                    : undefined
                }
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  -bottom-2
                  left-0
                  h-px
                  w-full
                  origin-left
                  bg-gradient-to-r
                  from-transparent
                  via-violet-300/70
                  to-transparent
                "
              />
            </span>
          </h1>

          {/* ROTATING TEXT */}

          <div
            className={`
              hero-reveal
              mt-8
              flex
              min-h-9
              flex-wrap
              items-center
              gap-x-2.5
              gap-y-1
              text-base
              text-white/48

              sm:text-xl

              ${
                animationsEnabled
                  ? "opacity-0"
                  : "opacity-100"
              }
            `}
          >
            <span>
              I create
            </span>

            <span
              className="
                relative
                inline-flex
                min-w-[190px]
                overflow-hidden
                font-semibold
                text-white

                sm:min-w-[250px]
              "
            >
              <AnimatePresence
                mode="wait"
                initial={false}
              >
                <motion.span
                  key={
                    rotatingWords[word]
                  }
                  initial={{
                    y: 20,
                    opacity: 0,
                    filter:
                      "blur(6px)",
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    filter:
                      "blur(0px)",
                  }}
                  exit={{
                    y: -20,
                    opacity: 0,
                    filter:
                      "blur(5px)",
                  }}
                  transition={{
                    duration: 0.42,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  className="
                    bg-gradient-to-r
                    from-white
                    to-violet-200
                    bg-clip-text
                    text-transparent
                  "
                >
                  {
                    rotatingWords[
                      word
                    ]
                  }
                  .
                </motion.span>
              </AnimatePresence>
            </span>
          </div>

          {/* DESCRIPTION */}

          <p
            className={`
              hero-reveal
              mt-6
              max-w-2xl
              text-[15px]
              leading-8
              text-white/48

              sm:text-lg
              sm:leading-9

              ${
                animationsEnabled
                  ? "opacity-0"
                  : "opacity-100"
              }
            `}
          >
            {
              settings.heroDescription
            }
          </p>

          {/* CTA BUTTONS */}

          <div
            className={`
              hero-reveal
              mt-9
              flex
              flex-wrap
              items-center
              gap-3

              ${
                animationsEnabled
                  ? "opacity-0"
                  : "opacity-100"
              }
            `}
          >
            <MagneticLink
              href="/#projects"
              className="
                group/primary
                relative
                overflow-hidden
                rounded-full
                border
                border-violet-300/20
                bg-gradient-to-r
                from-violet-600
                to-violet-500
                px-6
                py-3.5
                font-semibold
                text-white
                shadow-[0_12px_40px_rgba(124,58,237,.22)]
                transition
                duration-300

                hover:border-violet-300/40
                hover:shadow-[0_18px_55px_rgba(124,58,237,.32)]
              "
              cursor="VIEW"
            >
              <span
                className="
                  absolute
                  inset-0
                  translate-x-[-110%]
                  bg-gradient-to-r
                  from-transparent
                  via-white/15
                  to-transparent
                  transition-transform
                  duration-700
                  group-hover/primary:translate-x-[110%]
                "
              />

              <span className="relative">
                View my work
              </span>

              <ArrowRight
                size={17}
                className="
                  relative
                  transition-transform
                  duration-300
                  group-hover/primary:translate-x-1
                "
              />
            </MagneticLink>

            <MagneticLink
              href="/#contact"
              className="
                group/contact
                rounded-full
                border
                border-white/10
                bg-white/[0.045]
                px-6
                py-3.5
                font-medium
                text-white/80
                backdrop-blur-xl
                transition
                duration-300

                hover:border-white/20
                hover:bg-white/[0.075]
                hover:text-white
              "
              cursor="TALK"
            >
              Let&apos;s build
              something

              <ArrowUpRight
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover/contact:-translate-y-0.5
                  group-hover/contact:translate-x-0.5
                "
              />
            </MagneticLink>

            <MagneticLink
              href={
                settings.resumeUrl ||
                "#contact"
              }
              className="
                group/resume
                grid
                size-[50px]
                place-items-center
                rounded-full
                border
                border-white/10
                bg-white/[0.04]
                text-white/65
                backdrop-blur-xl
                transition-all
                duration-300

                hover:border-teal-300/25
                hover:bg-teal-300/[0.06]
                hover:text-teal-200
              "
              cursor="GET CV"
            >
              <Download
                size={18}
                className="
                  transition-transform
                  duration-300
                  group-hover/resume:translate-y-0.5
                "
              />

              <span className="sr-only">
                Download resume
              </span>
            </MagneticLink>
          </div>

          {/* =================================================
              STATS
          ================================================= */}

          <div
            className={`
              hero-reveal
              mt-12
              grid
              max-w-2xl
              gap-3

              sm:grid-cols-3

              ${
                animationsEnabled
                  ? "opacity-0"
                  : "opacity-100"
              }
            `}
          >
            <HeroStat
              icon={
                <Layers3 size={16} />
              }
              value={`${projectCount}+`}
              label="Projects"
            />

            <HeroStat
              icon={
                <Code2 size={16} />
              }
              value="Full-stack"
              label="Development"
            />

            <HeroStat
              icon={
                <Globe2 size={16} />
              }
              value="100%"
              label="Responsive"
            />
          </div>
        </div>

        {/* ===================================================
            RIGHT PERSON IMAGE SLIDER
        =================================================== */}

        <div
          className={`
            hero-photo
            relative
            mx-auto
            w-full
            max-w-[580px]

            ${
              animationsEnabled
                ? "opacity-0"
                : "opacity-100"
            }
          `}
        >
          {/* LARGE BACK GLOW */}

          <motion.div
            aria-hidden="true"
            animate={
              animationsEnabled
                ? {
                    scale: [1, 1.08, 1],
                    opacity: [0.28, 0.52, 0.28],
                  }
                : undefined
            }
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              -z-20
              h-[78%]
              w-[78%]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-violet-600/20
              blur-[115px]
            "
          />

          {/* TEAL AMBIENT GLOW */}

          <motion.div
            aria-hidden="true"
            animate={
              animationsEnabled
                ? {
                    x: [0, 18, 0],
                    y: [0, -14, 0],
                    opacity: [0.12, 0.3, 0.12],
                  }
                : undefined
            }
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              pointer-events-none
              absolute
              right-[2%]
              top-[12%]
              -z-10
              h-44
              w-44
              rounded-full
              bg-teal-300/15
              blur-[80px]
            "
          />

          {/* PREMIUM IMAGE FRAME */}

          <motion.div
            animate={
              animationsEnabled
                ? {
                    y: [0, -5, 0],
                  }
                : undefined
            }
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              relative
              overflow-hidden
              rounded-[32px]
              border
              border-white/[0.14]
              bg-gradient-to-b
              from-white/[0.08]
              via-white/[0.035]
              to-white/[0.02]
              p-[1px]
              shadow-[0_35px_100px_rgba(0,0,0,.48),0_0_0_1px_rgba(139,92,246,.05)]
              backdrop-blur-xl
            "
          >
            {/* ANIMATED BORDER LIGHT */}

            <motion.div
              aria-hidden="true"
              animate={
                animationsEnabled
                  ? {
                      opacity: [0.3, 0.8, 0.3],
                    }
                  : undefined
              }
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                pointer-events-none
                absolute
                inset-0
                rounded-[32px]
                bg-gradient-to-br
                from-violet-400/20
                via-transparent
                to-teal-300/20
              "
            />

            <div
              className="
                relative
                overflow-hidden
                rounded-[31px]
                border
                border-white/[0.06]
                bg-[#0c0c13]
              "
            >
              {/* IMAGE VIEWPORT */}

              <div
                className="
                  relative
                  h-[430px]
                  w-full
                  overflow-hidden

                  min-[380px]:h-[470px]
                  sm:h-[540px]
                  md:h-[580px]
                  lg:h-[640px]
                  xl:h-[670px]
                "
              >
                {/* SOFT INNER BACKGROUND */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_50%_35%,rgba(139,92,246,.11),transparent_45%),radial-gradient(circle_at_78%_30%,rgba(45,212,191,.07),transparent_32%)]
                  "
                />

                {/* SLIDING IMAGE */}

                <AnimatePresence
                  initial={false}
                  mode="sync"
                >
                  <motion.div
                    key={heroPhotos[activePhoto]}
                    initial={
                      animationsEnabled
                        ? {
                            opacity: 0,
                            x: 65,
                            scale: 0.94,
                            filter: "blur(10px)",
                          }
                        : {
                            opacity: 1,
                            x: 0,
                            scale: 1,
                            filter: "blur(0px)",
                          }
                    }
                    animate={{
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      filter: "blur(0px)",
                    }}
                    exit={
                      animationsEnabled
                        ? {
                            opacity: 0,
                            x: -65,
                            scale: 0.96,
                            filter: "blur(8px)",
                          }
                        : {
                            opacity: 0,
                          }
                    }
                    transition={{
                      duration: animationsEnabled ? 0.82 : 0,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                      absolute
                      inset-0
                      z-10
                    "
                  >
                    <Image
                      src={heroPhotos[activePhoto]}
                      alt={`${settings.name} portrait ${
                        activePhoto + 1
                      }`}
                      fill
                      priority={activePhoto === 0}
                      sizes="(max-width: 640px) 94vw, (max-width: 1024px) 80vw, 45vw"
                      className="
                        select-none
                        object-contain
                        object-bottom
                        p-2
                        drop-shadow-[0_32px_42px_rgba(0,0,0,.48)]

                        sm:p-3
                        lg:p-4
                      "
                    />
                  </motion.div>
                </AnimatePresence>

                {/* PRELOAD OTHER SLIDES */}

                <div
                  aria-hidden="true"
                  className="hidden"
                >
                  {heroPhotos.map((src) => (
                    <Image
                      key={src}
                      src={src}
                      alt=""
                      width={1}
                      height={1}
                    />
                  ))}
                </div>

                {/* TOP SHINE */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-0
                    z-20
                    h-px
                    w-[72%]
                    -translate-x-1/2
                    bg-gradient-to-r
                    from-transparent
                    via-white/50
                    to-transparent
                  "
                />

                {/* BOTTOM FADE */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    bottom-0
                    z-20
                    h-32
                    bg-gradient-to-t
                    from-[#08080d]/72
                    via-[#08080d]/18
                    to-transparent
                  "
                />

                {/* FLOOR SHADOW */}

                <motion.div
                  aria-hidden="true"
                  animate={
                    animationsEnabled
                      ? {
                          scaleX: [0.92, 1, 0.92],
                          opacity: [0.32, 0.5, 0.32],
                        }
                      : undefined
                  }
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                    pointer-events-none
                    absolute
                    bottom-3
                    left-1/2
                    z-[5]
                    h-12
                    w-[64%]
                    -translate-x-1/2
                    rounded-[50%]
                    bg-black/70
                    blur-2xl
                  "
                />

                {/* FLOATING LIGHTS */}

                <motion.span
                  aria-hidden="true"
                  animate={
                    animationsEnabled
                      ? {
                          y: [0, -9, 0],
                          opacity: [0.4, 1, 0.4],
                        }
                      : undefined
                  }
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                    absolute
                    right-[7%]
                    top-[18%]
                    z-30
                    size-2
                    rounded-full
                    bg-teal-300
                    shadow-[0_0_24px_rgba(94,234,212,.9)]
                  "
                />

                <motion.span
                  aria-hidden="true"
                  animate={
                    animationsEnabled
                      ? {
                          y: [0, 9, 0],
                          opacity: [0.4, 0.9, 0.4],
                        }
                      : undefined
                  }
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                    absolute
                    left-[7%]
                    top-[34%]
                    z-30
                    size-1.5
                    rounded-full
                    bg-violet-300
                    shadow-[0_0_22px_rgba(196,181,253,.9)]
                  "
                />

                {/* IMAGE COUNTER */}

                <div
                  className="
                    absolute
                    left-4
                    top-4
                    z-30
                    rounded-full
                    border
                    border-white/10
                    bg-black/30
                    px-3
                    py-1.5
                    font-mono
                    text-[9px]
                    font-semibold
                    tracking-[0.16em]
                    text-white/60
                    backdrop-blur-xl
                  "
                >
                  {String(activePhoto + 1).padStart(2, "0")}
                  <span className="mx-1 text-white/20">/</span>
                  {String(heroPhotos.length).padStart(2, "0")}
                </div>
              </div>

              {/* SLIDER FOOTER */}

              <div
                className="
                  relative
                  z-30
                  flex
                  items-center
                  justify-between
                  gap-4
                  border-t
                  border-white/[0.07]
                  bg-white/[0.025]
                  px-4
                  py-3.5
                  backdrop-blur-xl

                  sm:px-5
                  sm:py-4
                "
              >
                <div className="min-w-0">
                  <p
                    className="
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.22em]
                      text-white/30

                      sm:text-[9px]
                    "
                  >
                    Developer portfolio
                  </p>

                  <p
                    className="
                      mt-1
                      truncate
                      text-[11px]
                      font-medium
                      text-white/65

                      sm:text-xs
                    "
                  >
                    Creative. Modern. Production ready.
                  </p>
                </div>

                {/* SLIDER DOTS */}

                <div
                  className="
                    flex
                    shrink-0
                    items-center
                    gap-2
                  "
                >
                  {heroPhotos.map((src, index) => {
                    const isActive =
                      activePhoto === index;

                    return (
                      <button
                        key={src}
                        type="button"
                        onClick={() =>
                          setActivePhoto(index)
                        }
                        aria-label={`Show photo ${
                          index + 1
                        }`}
                        aria-current={
                          isActive
                            ? "true"
                            : undefined
                        }
                        className={`
                          relative
                          h-2
                          rounded-full
                          transition-all
                          duration-500

                          ${
                            isActive
                              ? "w-8 bg-gradient-to-r from-violet-400 to-teal-300 shadow-[0_0_14px_rgba(94,234,212,.22)]"
                              : "w-2 bg-white/20 hover:bg-white/45"
                          }
                        `}
                      >
                        <span className="sr-only">
                          Photo {index + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* OUTER BOTTOM GLOW */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-8
              left-1/2
              -z-10
              h-16
              w-[82%]
              -translate-x-1/2
              rounded-[50%]
              bg-violet-600/12
              blur-3xl
            "
          />
        </div>
      </div>

      {/* =====================================================
          SCROLL INDICATOR
      ===================================================== */}

      <a
        href="#about"
        className="
          group/scroll
          absolute
          bottom-7
          left-1/2
          z-20
          hidden
          -translate-x-1/2
          flex-col
          items-center
          gap-2
          text-[9px]
          font-medium
          uppercase
          tracking-[0.28em]
          text-white/30
          transition
          hover:text-white/65

          lg:flex
        "
        data-cursor="SCROLL"
      >
        Explore

        <span
          className="
            relative
            grid
            h-9
            w-6
            place-items-start
            rounded-full
            border
            border-white/10
            pt-1.5
          "
        >
          <motion.span
            animate={
              animationsEnabled
                ? {
                    y: [
                      0,
                      12,
                      0,
                    ],
                    opacity: [
                      0.4,
                      1,
                      0.4,
                    ],
                  }
                : undefined
            }
            transition={{
              duration: 1.7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              mx-auto
              block
              size-1
              rounded-full
              bg-teal-300
            "
          />
        </span>

        <ArrowDown
          size={13}
          className="
            transition-transform
            group-hover/scroll:translate-y-1
          "
        />
      </a>
    </section>
  );
}

/* =========================================================
   HERO STAT
========================================================= */

function HeroStat({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 18,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.07]
        bg-white/[0.025]
        p-4
        backdrop-blur-xl
        transition-colors
        duration-300
        hover:border-violet-300/15
        hover:bg-white/[0.04]
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          -right-8
          -top-8
          size-20
          rounded-full
          bg-violet-500/[0.08]
          blur-2xl
          transition
          group-hover:bg-violet-500/[0.14]
        "
      />

      <div
        className="
          mb-3
          flex
          size-8
          items-center
          justify-center
          rounded-xl
          border
          border-white/[0.07]
          bg-white/[0.035]
          text-violet-200
        "
      >
        {icon}
      </div>

      <strong
        className="
          block
          text-lg
          font-semibold
          tracking-[-0.03em]
          text-white

          sm:text-xl
        "
      >
        {value}
      </strong>

      <span
        className="
          mt-1
          block
          text-xs
          leading-5
          text-white/35
        "
      >
        {label}
      </span>
    </motion.div>
  );
}

/* =========================================================
   TECH MARQUEE
========================================================= */

export function TechMarquee() {
  const text = [
    ...tech,
    ...tech,
  ];

  return (
    <div
      className="
        relative
        z-10
        overflow-hidden
        border-y
        border-white/[0.06]
        bg-[#0a0a0f]/80
        py-5
        backdrop-blur-xl
      "
    >
      {/* LEFT FADE */}

      <div
        className="
          pointer-events-none
          absolute
          inset-y-0
          left-0
          z-10
          w-20
          bg-gradient-to-r
          from-[#08080d]
          to-transparent

          sm:w-36
        "
      />

      {/* RIGHT FADE */}

      <div
        className="
          pointer-events-none
          absolute
          inset-y-0
          right-0
          z-10
          w-20
          bg-gradient-to-l
          from-[#08080d]
          to-transparent

          sm:w-36
        "
      />

      <div
        className="
          marquee-track
          flex
          w-max
          items-center
          gap-8
        "
      >
        {text.map(
          (item, index) => (
            <div
              key={`${item}-${index}`}
              className="
                flex
                items-center
                gap-8
              "
            >
              <span
                className="
                  font-display
                  text-xs
                  font-semibold
                  tracking-[0.16em]
                  text-white/38
                  transition
                  duration-300
                  hover:text-white/75

                  sm:text-sm
                "
              >
                {item}
              </span>

              <span
                className="
                  text-[10px]
                  text-teal-300/65
                "
              >
                ✦
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}