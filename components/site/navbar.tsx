"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { MagneticLink } from "@/components/ui/magnetic-link";
import type { SiteSettings, SocialLink } from "@/lib/types";

/* =========================================================
   NAVIGATION ITEMS
========================================================= */

const navItems = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["Services", "#services"],
  ["Contact", "#contact"],
] as const;

/* =========================================================
   NAVBAR
========================================================= */

export function Navbar({
  settings,
  socials,
}: {
  settings: SiteSettings;
  socials: SocialLink[];
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] =
    useState("#home");

  /* =======================================================
     NAVBAR SCROLL EFFECT
  ======================================================= */

  useEffect(() => {
    const updateNavbar = () => {
      setScrolled(window.scrollY > 30);
    };

    updateNavbar();

    window.addEventListener(
      "scroll",
      updateNavbar,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateNavbar
      );
    };
  }, []);

  /* =======================================================
     ACTIVE SECTION DETECTION
  ======================================================= */

  useEffect(() => {
    const sections = navItems
      .map(([, href]) =>
        document.querySelector(href)
      )
      .filter(Boolean) as Element[];

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter(
            (entry) => entry.isIntersecting
          )
          .sort(
            (a, b) =>
              b.intersectionRatio -
              a.intersectionRatio
          );

        if (visibleEntries.length > 0) {
          setActiveSection(
            `#${visibleEntries[0].target.id}`
          );
        }
      },
      {
        rootMargin:
          "-35% 0px -50% 0px",
        threshold: [0.05, 0.2, 0.5],
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  /* =======================================================
     MOBILE BODY SCROLL LOCK
  ======================================================= */

  useEffect(() => {
    if (open) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* =======================================================
     ESCAPE KEY CLOSE
  ======================================================= */

  useEffect(() => {
    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  return (
    <>
      {/* =====================================================
          MAIN NAVBAR
      ===================================================== */}

      <motion.header
        initial={{
          y: -80,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          fixed
          inset-x-0
          top-0
          z-50
          px-3
          pt-3

          sm:px-5
          sm:pt-4
        "
      >
        <motion.div
          animate={{
            backgroundColor: scrolled
              ? "rgba(10,10,16,0.80)"
              : "rgba(10,10,16,0.30)",

            borderColor: scrolled
              ? "rgba(255,255,255,0.11)"
              : "rgba(255,255,255,0.06)",
          }}
          transition={{
            duration: 0.4,
          }}
          className="
            relative
            mx-auto
            flex
            h-[70px]
            max-w-[1420px]
            items-center
            justify-between
            overflow-hidden
            rounded-2xl
            border
            px-3
            shadow-[0_20px_70px_rgba(0,0,0,0.25)]
            backdrop-blur-2xl

            sm:h-[74px]
            sm:px-5

            lg:px-6
          "
        >
          {/* TOP HIGHLIGHT */}

          <div
            className="
              pointer-events-none
              absolute
              inset-x-16
              top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-white/30
              to-transparent
            "
          />

          {/* LEFT GLOW */}

          <div
            className="
              pointer-events-none
              absolute
              -left-20
              top-1/2
              size-52
              -translate-y-1/2
              rounded-full
              bg-violet-500/[0.08]
              blur-[80px]
            "
          />

          {/* RIGHT GLOW */}

          <div
            className="
              pointer-events-none
              absolute
              -right-16
              top-1/2
              size-44
              -translate-y-1/2
              rounded-full
              bg-teal-400/[0.06]
              blur-[70px]
            "
          />

          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            href="/#home"
            className="
              group
              relative
              z-10
              flex
              min-w-0
              items-center
              gap-3
            "
            data-cursor="HOME"
            aria-label="Go to home"
          >
            <motion.span
              whileHover={{
                rotate: 8,
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.92,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 18,
              }}
              className="
                relative
                grid
                size-10
                shrink-0
                place-items-center
                overflow-hidden
                rounded-[14px]
                border
                border-white/10
                bg-white/[0.06]
                text-sm
                font-black
                text-white
                shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
                transition
                duration-500

                group-hover:border-violet-400/50
                group-hover:shadow-[0_0_30px_rgba(139,92,246,0.16)]
              "
            >
              <span
                className="
                  absolute
                  inset-0
                  bg-gradient-to-br
                  from-violet-500/15
                  via-transparent
                  to-teal-400/10
                  opacity-0
                  transition-opacity
                  duration-500
                  group-hover:opacity-100
                "
              />

              <span className="relative">
                P
                <span className="text-teal-300">
                  .
                </span>
              </span>
            </motion.span>

            {/* NAME */}

            <div
              className="
                hidden
                min-w-0
                flex-col
                sm:flex
              "
            >
              <span
                className="
                  max-w-[170px]
                  truncate
                  text-sm
                  font-semibold
                  tracking-[0.02em]
                  text-white/90
                  transition
                  duration-300
                  group-hover:text-white
                "
              >
                {settings.name}
              </span>

              <span
                className="
                  mt-0.5
                  flex
                  items-center
                  gap-1
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.20em]
                  text-white/30
                "
              >
                <Sparkles
                  size={9}
                  className="text-violet-300"
                />

                Developer
              </span>
            </div>
          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <nav
            className="
              relative
              z-10
              hidden
              items-center
              rounded-full
              border
              border-white/[0.06]
              bg-white/[0.025]
              p-1

              lg:flex
            "
            aria-label="Primary navigation"
          >
            {navItems.map(
              ([label, href]) => {
                const active =
                  activeSection === href;

                return (
                  <Link
                    key={href}
                    href={`/${href}`}
                    className="
                      group/nav
                      relative
                      flex
                      h-10
                      items-center
                      justify-center
                      rounded-full
                      px-3
                      text-[11px]
                      font-medium
                      text-white/48
                      transition-colors
                      duration-300
                      hover:text-white

                      xl:px-4
                      xl:text-[13px]
                    "
                    data-cursor="GO"
                    aria-current={
                      active
                        ? "page"
                        : undefined
                    }
                  >
                    {/* ACTIVE BG */}

                    {active && (
                      <motion.span
                        layoutId="active-navbar-item"
                        transition={{
                          type: "spring",
                          stiffness: 330,
                          damping: 28,
                        }}
                        className="
                          absolute
                          inset-0
                          rounded-full
                          border
                          border-white/[0.08]
                          bg-white/[0.065]
                          shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
                        "
                      />
                    )}

                    {/* HOVER GLOW */}

                    <span
                      className="
                        absolute
                        inset-0
                        rounded-full
                        bg-violet-400/[0.055]
                        opacity-0
                        blur-md
                        transition-opacity
                        duration-300
                        group-hover/nav:opacity-100
                      "
                    />

                    <span
                      className={`relative z-10 ${
                        active
                          ? "text-white"
                          : ""
                      }`}
                    >
                      {label}
                    </span>

                    {/* ACTIVE DOT */}

                    {active && (
                      <motion.span
                        layoutId="active-dot"
                        className="
                          absolute
                          -bottom-[1px]
                          left-1/2
                          size-1
                          -translate-x-1/2
                          rounded-full
                          bg-teal-300
                          shadow-[0_0_8px_rgba(94,234,212,0.9)]
                        "
                      />
                    )}
                  </Link>
                );
              }
            )}
          </nav>

          {/* =================================================
              RIGHT BUTTONS
          ================================================= */}

          <div
            className="
              relative
              z-10
              flex
              shrink-0
              items-center
              gap-2
            "
          >
            {/* RESUME */}

            <MagneticLink
              href={
                settings.resumeUrl ||
                "/#contact"
              }
              className="
                group/resume
                relative
                hidden
                h-10
                items-center
                gap-2
                overflow-hidden
                rounded-full
                border
                border-white/10
                bg-white/[0.04]
                px-4
                text-xs
                font-medium
                text-white/70
                transition-all
                duration-300

                hover:border-white/20
                hover:bg-white/[0.08]
                hover:text-white

                sm:inline-flex
              "
              cursor="GET CV"
            >
              <span
                className="
                  pointer-events-none
                  absolute
                  inset-y-0
                  -left-16
                  w-12
                  rotate-12
                  bg-white/10
                  blur-md
                  transition-all
                  duration-700
                  group-hover/resume:left-[120%]
                "
              />

              <ArrowDownToLine
                size={14}
              />

              Resume
            </MagneticLink>

            {/* TALK */}

            <MagneticLink
              href="/#contact"
              className="
                group/talk
                relative
                hidden
                h-10
                items-center
                gap-2
                overflow-hidden
                rounded-full
                border
                border-violet-300/20
                bg-gradient-to-r
                from-violet-500/80
                to-violet-400/65
                px-4
                text-xs
                font-semibold
                text-white
                shadow-[0_8px_30px_rgba(124,58,237,0.18)]
                transition-all
                duration-300

                hover:border-violet-300/40
                hover:shadow-[0_12px_40px_rgba(124,58,237,0.30)]

                md:inline-flex
              "
              cursor="TALK"
            >
              <span className="relative">
                Let&apos;s talk
              </span>

              <ArrowUpRight
                size={15}
              />
            </MagneticLink>

            {/* MOBILE MENU BUTTON */}

            <motion.button
              type="button"
              whileTap={{
                scale: 0.92,
              }}
              onClick={() =>
                setOpen(true)
              }
              className="
                group/menu
                relative
                grid
                size-11
                shrink-0
                place-items-center
                overflow-hidden
                rounded-full
                border
                border-white/10
                bg-white/[0.055]
                text-white
                transition-all
                duration-300

                hover:border-violet-400/40
                hover:bg-white/[0.08]

                lg:hidden
              "
              aria-label="Open navigation"
              aria-expanded={open}
            >
              <span
                className="
                  absolute
                  inset-0
                  rounded-full
                  bg-violet-500/10
                  opacity-0
                  blur-xl
                  transition
                  group-hover/menu:opacity-100
                "
              />

              <Menu
                size={20}
                className="relative"
              />
            </motion.button>
          </div>
        </motion.div>
      </motion.header>

      {/* =====================================================
          MOBILE / TABLET NAVIGATION
      ===================================================== */}

      <AnimatePresence>
        {open && (
          <motion.div
            className="
              fixed
              inset-0
              z-[999]
              lg:hidden
            "
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            {/* BACKDROP */}

            <motion.button
              type="button"
              aria-label="Close navigation"
              onClick={() =>
                setOpen(false)
              }
              className="
                absolute
                inset-0
                bg-black/80
                backdrop-blur-md
              "
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
            />

            {/* ===============================================
                MOBILE SIDE PANEL
            =============================================== */}

            <motion.aside
              className="
                absolute
                right-0
                top-0
                flex
                h-[100dvh]
                w-[min(94vw,480px)]
                flex-col
                overflow-x-hidden
                overflow-y-auto
                overscroll-contain
                border-l
                border-white/10
                bg-[#0a0a10]
                px-4
                pb-[max(20px,env(safe-area-inset-bottom))]
                pt-4
                shadow-[-25px_0_100px_rgba(0,0,0,0.55)]

                min-[380px]:px-5
                min-[380px]:pt-5

                sm:px-7
                sm:pt-7
              "
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{
                duration: 0.45,
                ease: [
                  0.76,
                  0,
                  0.24,
                  1,
                ],
              }}
            >
              {/* BACKGROUND GLOW 1 */}

              <div
                className="
                  pointer-events-none
                  fixed
                  -right-32
                  -top-28
                  size-[350px]
                  rounded-full
                  bg-violet-600/[0.11]
                  blur-[110px]
                "
              />

              {/* BACKGROUND GLOW 2 */}

              <div
                className="
                  pointer-events-none
                  fixed
                  -bottom-32
                  right-0
                  size-[300px]
                  rounded-full
                  bg-teal-400/[0.055]
                  blur-[110px]
                "
              />

              {/* ===============================================
                  MOBILE HEADER
              =============================================== */}

              <div
                className="
                  relative
                  z-20
                  flex
                  shrink-0
                  items-center
                  justify-between
                  border-b
                  border-white/10
                  pb-4
                "
              >
                <Link
                  href="/#home"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-3
                  "
                >
                  <span
                    className="
                      grid
                      size-10
                      shrink-0
                      place-items-center
                      rounded-xl
                      border
                      border-white/10
                      bg-white/[0.06]
                      text-sm
                      font-black
                      text-white
                    "
                  >
                    P
                    <span className="text-teal-300">
                      .
                    </span>
                  </span>

                  <div className="min-w-0">
                    <p
                      className="
                        max-w-[190px]
                        truncate
                        text-sm
                        font-semibold
                        text-white
                      "
                    >
                      {settings.name}
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-[9px]
                        uppercase
                        tracking-[0.20em]
                        text-white/35
                      "
                    >
                      Developer
                    </p>
                  </div>
                </Link>

                {/* CLOSE */}

                <motion.button
                  type="button"
                  whileTap={{
                    scale: 0.9,
                  }}
                  whileHover={{
                    rotate: 90,
                  }}
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                    grid
                    size-10
                    shrink-0
                    place-items-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.05]
                    text-white
                    transition
                    hover:border-violet-400/40
                    hover:bg-white/[0.10]
                  "
                  aria-label="Close navigation"
                >
                  <X size={19} />
                </motion.button>
              </div>

              {/* ===============================================
                  MOBILE LINKS
              =============================================== */}

              <nav
                className="
                  relative
                  z-20
                  mt-4
                  flex
                  w-full
                  shrink-0
                  flex-col
                "
                aria-label="Mobile navigation"
              >
                {navItems.map(
                  (
                    [label, href],
                    index
                  ) => {
                    const active =
                      activeSection === href;

                    return (
                      <motion.div
                        key={href}
                        className="w-full"
                        initial={{
                          x: 45,
                          opacity: 0,
                        }}
                        animate={{
                          x: 0,
                          opacity: 1,
                        }}
                        transition={{
                          delay:
                            0.05 +
                            index *
                              0.04,
                          duration: 0.4,
                          ease: [
                            0.22,
                            1,
                            0.36,
                            1,
                          ],
                        }}
                      >
                        <Link
                          href={`/${href}`}
                          onClick={() =>
                            setOpen(false)
                          }
                          className="
                            group/mobile
                            relative
                            flex
                            min-h-[50px]
                            w-full
                            items-center
                            justify-between
                            overflow-hidden
                            border-b
                            border-white/[0.08]
                            px-1
                            py-2
                            text-[18px]
                            font-semibold
                            tracking-[-0.03em]
                            text-white/60
                            transition-all
                            duration-300

                            hover:pl-2
                            hover:text-white

                            min-[360px]:min-h-[54px]
                            min-[360px]:py-2.5
                            min-[360px]:text-[20px]

                            min-[400px]:min-h-[58px]
                            min-[400px]:text-[22px]

                            sm:min-h-[62px]
                            sm:text-[24px]
                          "
                        >
                          {/* HOVER BG */}

                          <span
                            className="
                              absolute
                              inset-0
                              -translate-x-full
                              bg-gradient-to-r
                              from-violet-500/[0.10]
                              to-transparent
                              transition-transform
                              duration-500
                              group-hover/mobile:translate-x-0
                            "
                          />

                          {/* LABEL */}

                          <span
                            className="
                              relative
                              z-10
                              flex
                              min-w-0
                              items-center
                              gap-3
                            "
                          >
                            <span
                              className="
                                w-6
                                shrink-0
                                text-[9px]
                                font-medium
                                tracking-widest
                                text-white/20
                              "
                            >
                              {String(
                                index +
                                  1
                              ).padStart(
                                2,
                                "0"
                              )}
                            </span>

                            <span
                              className={`truncate ${
                                active
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              {label}
                            </span>

                            {active && (
                              <span
                                className="
                                  size-1.5
                                  shrink-0
                                  rounded-full
                                  bg-teal-300
                                  shadow-[0_0_10px_rgba(94,234,212,0.85)]
                                "
                              />
                            )}
                          </span>

                          <ArrowUpRight
                            size={18}
                            className="
                              relative
                              z-10
                              shrink-0
                              text-white/25
                              transition-all
                              duration-300
                              group-hover/mobile:-translate-y-0.5
                              group-hover/mobile:translate-x-0.5
                              group-hover/mobile:text-teal-300
                            "
                          />
                        </Link>
                      </motion.div>
                    );
                  }
                )}
              </nav>

              {/* ===============================================
                  MOBILE FOOTER
              =============================================== */}

              <motion.div
                initial={{
                  y: 20,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.35,
                  duration: 0.4,
                }}
                className="
                  relative
                  z-20
                  mt-5
                  shrink-0
                  border-t
                  border-white/10
                  pt-4
                "
              >
                {/* SOCIAL LINKS */}

                {socials.length >
                  0 && (
                  <div
                    className="
                      mb-4
                      flex
                      flex-wrap
                      gap-x-4
                      gap-y-2
                    "
                  >
                    {socials.map(
                      (social) => (
                        <Link
                          key={
                            social.id
                          }
                          href={
                            social.url
                          }
                          target={
                            social.url.startsWith(
                              "http"
                            )
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            social.url.startsWith(
                              "http"
                            )
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="
                            group/social
                            flex
                            items-center
                            gap-1
                            text-xs
                            text-white/40
                            transition
                            duration-300
                            hover:text-white
                          "
                        >
                          {
                            social.platform
                          }

                          <ArrowUpRight
                            size={10}
                          />
                        </Link>
                      )
                    )}
                  </div>
                )}

                {/* MOBILE BUTTONS */}

                <div
                  className="
                    grid
                    grid-cols-1
                    gap-2.5

                    min-[390px]:grid-cols-2
                  "
                >
                  {/* RESUME */}

                  <Link
                    href={
                      settings.resumeUrl ||
                      "/#contact"
                    }
                    onClick={() =>
                      setOpen(false)
                    }
                    className="
                      flex
                      min-h-[46px]
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-white/10
                      bg-white/[0.05]
                      px-4
                      text-sm
                      font-medium
                      text-white/75
                      transition

                      hover:border-white/20
                      hover:bg-white/[0.09]
                      hover:text-white
                    "
                  >
                    <ArrowDownToLine
                      size={15}
                    />

                    Resume
                  </Link>

                  {/* CONTACT */}

                  <Link
                    href="/#contact"
                    onClick={() =>
                      setOpen(false)
                    }
                    className="
                      flex
                      min-h-[46px]
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-violet-300/20
                      bg-gradient-to-r
                      from-violet-600
                      to-violet-500
                      px-4
                      text-sm
                      font-semibold
                      text-white
                      shadow-[0_10px_30px_rgba(124,58,237,0.20)]
                      transition

                      hover:shadow-[0_14px_40px_rgba(124,58,237,0.30)]
                    "
                  >
                    Let&apos;s talk

                    <ArrowUpRight
                      size={15}
                    />
                  </Link>
                </div>
              </motion.div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}