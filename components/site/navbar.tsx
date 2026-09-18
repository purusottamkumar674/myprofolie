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

import type { SiteSettings, SocialLink } from "@/lib/types";
import { MagneticLink } from "@/components/ui/magnetic-link";

const navItems = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["Services", "#services"],
  ["Contact", "#contact"],
] as const;

export function Navbar({
  settings,
  socials,
}: {
  settings: SiteSettings;
  socials: SocialLink[];
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  /* =========================================================
     NAVBAR SCROLL EFFECT
  ========================================================= */

  useEffect(() => {
    const updateNavbar = () => {
      setScrolled(window.scrollY > 30);
    };

    updateNavbar();

    window.addEventListener("scroll", updateNavbar, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateNavbar);
    };
  }, []);

  /* =========================================================
     ACTIVE SECTION DETECTION
  ========================================================= */

  useEffect(() => {
    const sections = navItems
      .map(([, href]) =>
        document.querySelector(href)
      )
      .filter(Boolean) as Element[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
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
        rootMargin: "-35% 0px -50% 0px",
        threshold: [0.05, 0.2, 0.5],
      }
    );

    sections.forEach((section) =>
      observer.observe(section)
    );

    return () => observer.disconnect();
  }, []);

  /* =========================================================
     MOBILE MENU BODY LOCK
  ========================================================= */

  useEffect(() => {
    document.body.style.overflow = open
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* =========================================================
     ESC CLOSE
  ========================================================= */

  useEffect(() => {
    const closeWithEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      closeWithEscape
    );

    return () =>
      window.removeEventListener(
        "keydown",
        closeWithEscape
      );
  }, []);

  return (
    <>
      {/* =====================================================
          DESKTOP / MAIN NAVBAR
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

          {/* NAVBAR BACKGROUND GLOW */}

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
              {/* LOGO GLOW */}

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
                      px-3.5
                      text-[12px]
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
                    {/* ACTIVE BACKGROUND */}

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
              NAVBAR RIGHT BUTTONS
          ================================================= */}

          <div
            className="
              relative
              z-10
              flex
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
              {/* SHINE */}

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
                className="
                  transition-transform
                  duration-300
                  group-hover/resume:translate-y-0.5
                "
              />

              Resume
            </MagneticLink>

            {/* TALK BUTTON */}

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
              {/* BUTTON GLOW */}

              <span
                className="
                  absolute
                  inset-0
                  bg-gradient-to-r
                  from-white/10
                  via-transparent
                  to-teal-300/10
                  opacity-0
                  transition-opacity
                  duration-300
                  group-hover/talk:opacity-100
                "
              />

              <span className="relative">
                Let&apos;s talk
              </span>

              <ArrowUpRight
                size={15}
                className="
                  relative
                  transition-transform
                  duration-300
                  group-hover/talk:-translate-y-0.5
                  group-hover/talk:translate-x-0.5
                "
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
              data-cursor="MENU"
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
          MOBILE NAVIGATION
      ===================================================== */}

      <AnimatePresence>
        {open && (
          <motion.div
            className="
              fixed
              inset-0
              z-[100]
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
              aria-label="Close navigation backdrop"
              className="
                absolute
                inset-0
                bg-black/75
                backdrop-blur-md
              "
              onClick={() =>
                setOpen(false)
              }
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

            {/* SIDE PANEL */}

            <motion.aside
              className="
                absolute
                right-0
                top-0
                flex
                h-full
                w-[min(92vw,520px)]
                flex-col
                overflow-hidden
                border-l
                border-white/10
                bg-[#0a0a10]
                p-5

                sm:p-8
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
                duration: 0.62,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              {/* PANEL GLOW */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-32
                  -top-28
                  size-[350px]
                  rounded-full
                  bg-violet-600/[0.11]
                  blur-[110px]
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-32
                  -left-24
                  size-[300px]
                  rounded-full
                  bg-teal-400/[0.055]
                  blur-[110px]
                "
              />

              {/* MOBILE HEADER */}

              <div
                className="
                  relative
                  z-10
                  flex
                  items-center
                  justify-between
                  border-b
                  border-white/10
                  pb-5
                "
              >
                <div>
                  <span
                    className="
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.30em]
                      text-white/35
                    "
                  >
                    Navigation
                  </span>

                  <p
                    className="
                      mt-1
                      text-sm
                      font-medium
                      text-white/75
                    "
                  >
                    {settings.name}
                  </p>
                </div>

                <motion.button
                  type="button"
                  whileHover={{
                    rotate: 90,
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                    grid
                    size-11
                    place-items-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.04]
                    text-white
                    transition
                    hover:border-violet-400/40
                    hover:bg-white/[0.08]
                  "
                  aria-label="Close navigation"
                >
                  <X size={19} />
                </motion.button>
              </div>

              {/* MOBILE LINKS */}

              <nav
                className="
                  relative
                  z-10
                  my-auto
                  flex
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
                      activeSection ===
                      href;

                    return (
                      <motion.div
                        key={href}
                        initial={{
                          x: 70,
                          opacity: 0,
                        }}
                        animate={{
                          x: 0,
                          opacity: 1,
                        }}
                        transition={{
                          delay:
                            0.1 +
                            index *
                              0.055,
                          duration: 0.55,
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
                            items-center
                            justify-between
                            overflow-hidden
                            border-b
                            border-white/[0.08]
                            py-4
                            text-[clamp(1.8rem,8vw,3rem)]
                            font-semibold
                            tracking-[-0.04em]
                            text-white/55
                            transition-all
                            duration-300

                            hover:pl-2
                            hover:text-white
                          "
                        >
                          {/* HOVER BACKGROUND */}

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

                          <span
                            className="
                              relative
                              flex
                              items-center
                              gap-3
                            "
                          >
                            <span
                              className="
                                text-[10px]
                                font-medium
                                tracking-widest
                                text-white/20
                              "
                            >
                              0
                              {index +
                                1}
                            </span>

                            <span
                              className={
                                active
                                  ? "text-white"
                                  : ""
                              }
                            >
                              {
                                label
                              }
                            </span>

                            {active && (
                              <span
                                className="
                                  size-1.5
                                  rounded-full
                                  bg-teal-300
                                  shadow-[0_0_10px_rgba(94,234,212,0.85)]
                                "
                              />
                            )}
                          </span>

                          <ArrowUpRight
                            size={23}
                            className="
                              relative
                              text-white/20
                              transition-all
                              duration-300
                              group-hover/mobile:-translate-y-1
                              group-hover/mobile:translate-x-1
                              group-hover/mobile:text-teal-300
                            "
                          />
                        </Link>
                      </motion.div>
                    );
                  }
                )}
              </nav>

              {/* MOBILE FOOTER */}

              <motion.div
                initial={{
                  y: 30,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.5,
                  duration: 0.5,
                }}
                className="
                  relative
                  z-10
                  border-t
                  border-white/10
                  pt-5
                "
              >
                {/* SOCIALS */}

                <div
                  className="
                    mb-5
                    flex
                    flex-wrap
                    gap-x-5
                    gap-y-3
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
                          text-sm
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
                          size={11}
                          className="
                            opacity-0
                            transition
                            group-hover/social:opacity-100
                          "
                        />
                      </Link>
                    )
                  )}
                </div>

                {/* MOBILE PROJECT BUTTON */}

                <MagneticLink
                  href="/#contact"
                  className="
                    group/project
                    relative
                    w-full
                    justify-center
                    overflow-hidden
                    rounded-2xl
                    border
                    border-violet-300/20
                    bg-gradient-to-r
                    from-violet-600
                    to-violet-500
                    py-3.5
                    font-semibold
                    text-white
                    shadow-[0_12px_40px_rgba(124,58,237,0.20)]
                  "
                  cursor="TALK"
                >
                  <span
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-r
                      from-white/10
                      via-transparent
                      to-teal-300/10
                      opacity-0
                      transition
                      group-hover/project:opacity-100
                    "
                  />

                  <span className="relative">
                    Start a project
                  </span>

                  <ArrowUpRight
                    size={17}
                    className="
                      relative
                      transition-transform
                      group-hover/project:-translate-y-0.5
                      group-hover/project:translate-x-0.5
                    "
                  />
                </MagneticLink>
              </motion.div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}