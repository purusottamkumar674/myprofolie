"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import {
  ArrowUp,
  ArrowUpRight,
  CheckCircle2,
  Github,
  Instagram,
  Linkedin,
  LoaderCircle,
  Mail,
  MessageCircle,
  Send,
  Twitter,
} from "lucide-react";

import Link from "next/link";

import {
  FormEvent,
  useRef,
  useState,
} from "react";

import { MagneticLink } from "@/components/ui/magnetic-link";
import { Reveal } from "@/components/ui/reveal";

import type {
  SiteSettings,
  SocialLink,
} from "@/lib/types";


/* =========================================================
   SOCIAL ICONS
========================================================= */

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Instagram,
  "X / Twitter": Twitter,
  X: Twitter,
  Twitter,
  Email: Mail,
  WhatsApp: MessageCircle,
};


/* =========================================================
   CONTACT FORM STATE
========================================================= */

type FormState =
  | "idle"
  | "submitting"
  | "success"
  | "error";


/* =========================================================
   CONTACT SECTION
========================================================= */

export function ContactSection({
  settings,
  socials,
}: {
  settings: SiteSettings;
  socials: SocialLink[];
}) {
  const [state, setState] =
    useState<FormState>("idle");

  const [message, setMessage] =
    useState("");


  /* ---------------------------------------------------------
     CONTACT FORM SUBMIT
  --------------------------------------------------------- */

  const submit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setState("submitting");
    setMessage("");

    const form =
      event.currentTarget;

    const payload =
      Object.fromEntries(
        new FormData(form).entries()
      );

    try {
      const response =
        await fetch("/api/contact", {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(payload),
        });

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Message could not be sent."
        );
      }

      setState("success");

      setMessage(
        "Thanks — your message is now in my inbox."
      );

      form.reset();
    } catch (error) {
      setState("error");

      setMessage(
        error instanceof Error
          ? error.message
          : "Please try again or contact me by email."
      );
    }
  };


  return (
    <section
      id="contact"
      className="
        section-pad
        relative
        z-10
        overflow-hidden
      "
    >
      <div className="page-shell">

        <div className="contact-shell">

          {/* BACKGROUND ORBS */}

          <span className="contact-orb contact-orb--one" />

          <span className="contact-orb contact-orb--two" />


          <div
            className="
              relative
              grid
              gap-12
              p-6
              sm:p-10
              lg:grid-cols-[.82fr_1.18fr]
              lg:gap-16
              lg:p-14
            "
          >

            {/* =================================================
                LEFT CONTACT CONTENT
            ================================================= */}

            <Reveal>

              <p className="section-kicker">
                Start a conversation
              </p>


              <h2
                className="
                  font-display
                  text-[clamp(3rem,6vw,6.7rem)]
                  font-semibold
                  leading-[.9]
                  tracking-[-0.06em]
                  text-white
                "
              >
                Let&apos;s build

                <br />

                <span className="text-gradient">
                  something useful.
                </span>
              </h2>


              <p
                className="
                  mt-7
                  max-w-lg
                  text-base
                  leading-8
                  text-white/48
                "
              >
                Tell me what you are building,
                what is currently getting in
                the way, and what a successful
                result should look like.
              </p>


              {/* CONTACT DETAILS */}

              <div className="mt-10 space-y-4">

                <a
                  className="contact-detail"
                  href={
                    "mailto:" +
                    settings.email
                  }
                  data-cursor="EMAIL"
                >
                  <span
                    className="
                      grid
                      size-10
                      place-items-center
                      rounded-xl
                      bg-white/[0.06]
                      text-violet-300
                    "
                  >
                    <Mail size={18} />
                  </span>

                  <span>
                    <small>
                      Email
                    </small>

                    <strong>
                      {settings.email}
                    </strong>
                  </span>
                </a>


                <div className="contact-detail">

                  <span
                    className="
                      grid
                      size-10
                      place-items-center
                      rounded-xl
                      bg-white/[0.06]
                      text-teal-300
                    "
                  >
                    <MessageCircle
                      size={18}
                    />
                  </span>

                  <span>
                    <small>
                      Phone / WhatsApp
                    </small>

                    <strong>
                      {settings.phone}
                    </strong>
                  </span>

                </div>

              </div>


              {/* SOCIAL LINKS */}

              <div
                className="
                  mt-8
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {socials.map(
                  (social) => {

                    const Icon =
                      socialIcons[
                        social.platform as keyof typeof socialIcons
                      ] ??
                      ArrowUpRight;

                    return (
                      <Link
                        key={
                          social.id
                        }
                        href={
                          social.url
                        }
                        className="social-button"
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
                        aria-label={
                          social.platform
                        }
                        data-cursor="VISIT"
                      >
                        <Icon
                          size={17}
                        />
                      </Link>
                    );
                  }
                )}
              </div>

            </Reveal>


            {/* =================================================
                CONTACT FORM
            ================================================= */}

            <Reveal delay={0.08}>

              <form
                className="contact-form"
                onSubmit={submit}
              >

                {/* SPAM FIELD */}

                <input
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />


                <div
                  className="
                    grid
                    gap-5
                    sm:grid-cols-2
                  "
                >

                  <Field
                    label="Your name"
                    name="name"
                    placeholder="Purushottam"
                    required
                  />


                  <Field
                    label="Email address"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                  />


                  <Field
                    label="Phone"
                    name="phone"
                    placeholder="+91"
                  />


                  <Field
                    label="Company"
                    name="company"
                    placeholder="Company or brand"
                  />


                  {/* PROJECT TYPE */}

                  <label className="form-field">

                    <span>
                      Project type
                    </span>

                    <select
                      name="projectType"
                      defaultValue=""
                    >
                      <option
                        value=""
                        disabled
                      >
                        Select one
                      </option>

                      <option>
                        Business website
                      </option>

                      <option>
                        Admin dashboard
                      </option>

                      <option>
                        SaaS product
                      </option>

                      <option>
                        Portfolio
                      </option>

                      <option>
                        E-commerce
                      </option>

                      <option>
                        Website redesign
                      </option>

                      <option>
                        Digital Marketing
                      </option>

                      <option>
                        Other
                      </option>

                    </select>

                  </label>


                  {/* BUDGET */}

                  <label className="form-field">

                    <span>
                      Budget range
                    </span>

                    <select
                      name="budget"
                      defaultValue=""
                    >
                      <option
                        value=""
                        disabled
                      >
                        Select one
                      </option>

                      <option>
                        Let&apos;s discuss
                      </option>

                      <option>
                        ₹25k – ₹50k
                      </option>

                      <option>
                        ₹50k – ₹1L
                      </option>

                      <option>
                        ₹1L – ₹3L
                      </option>

                      <option>
                        ₹3L+
                      </option>

                    </select>

                  </label>

                </div>


                {/* MESSAGE */}

                <label
                  className="
                    form-field
                    mt-5
                  "
                >
                  <span>
                    Project details
                  </span>

                  <textarea
                    name="message"
                    rows={5}
                    placeholder="What should we build, and what matters most?"
                    required
                    minLength={10}
                  />
                </label>


                {/* SUBMIT */}

                <div
                  className="
                    mt-6
                    flex
                    flex-wrap
                    items-center
                    gap-4
                  "
                >

                  <motion.button
                    type="submit"
                    disabled={
                      state ===
                      "submitting"
                    }
                    className="primary-button"
                    whileTap={{
                      scale: 0.97,
                    }}
                    data-cursor="SEND"
                  >

                    {state ===
                    "submitting" ? (
                      <LoaderCircle
                        size={17}
                        className="animate-spin"
                      />
                    ) : state ===
                      "success" ? (
                      <CheckCircle2
                        size={17}
                      />
                    ) : (
                      <Send
                        size={17}
                      />
                    )}


                    {state ===
                    "submitting"
                      ? "Sending..."
                      : state ===
                        "success"
                      ? "Message sent"
                      : "Send message"}

                  </motion.button>


                  {message ? (
                    <p
                      className={
                        "text-sm " +
                        (state ===
                        "error"
                          ? "text-rose-300"
                          : "text-teal-300")
                      }
                      role="status"
                    >
                      {message}
                    </p>
                  ) : null}

                </div>

              </form>

            </Reveal>

          </div>

        </div>

      </div>
    </section>
  );
}


/* =========================================================
   FORM FIELD
========================================================= */

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <label className="form-field">

      <span>
        {label}
      </span>

      <input
        name={name}
        type={type}
        placeholder={
          placeholder
        }
        required={
          required
        }
      />

    </label>
  );
}


/* =========================================================
   FOOTER
========================================================= */

export function Footer({
  settings,
  socials,
}: {
  settings: SiteSettings;
  socials: SocialLink[];
}) {

  /*
   * Ref for our big PURUSOTTAM
   * name at bottom of footer.
   */
  const nameRef =
    useRef<HTMLDivElement>(null);


  /*
   * Detect scroll progress only
   * around big footer name.
   */
  const {
    scrollYProgress,
  } = useScroll({
    target: nameRef,

    offset: [
      "start end",
      "end start",
    ],
  });


  /*
   * Very subtle vertical
   * parallax movement.
   */
  const nameY =
    useTransform(
      scrollYProgress,
      [0, 1],
      [22, -22]
    );


  /*
   * Very subtle scale movement.
   */
  const nameScale =
    useTransform(
      scrollYProgress,
      [0, 0.5, 1],
      [0.98, 1, 0.98]
    );


  /*
   * Slight opacity transition
   * while entering viewport.
   */
  const nameOpacity =
    useTransform(
      scrollYProgress,
      [0, 0.25, 0.75, 1],
      [0.65, 1, 1, 0.7]
    );


  return (
    <footer
      className="
        relative
        z-10
        overflow-hidden
        border-t
        border-white/[0.07]
        bg-[#07070a]
      "
    >

      {/* =====================================================
          FOOTER TOP CONTENT
      ===================================================== */}

      <div
        className="
          page-shell
          relative
          z-20
          pb-8
          pt-16
        "
      >

        {/* TOP CTA */}

        <div
          className="
            grid
            gap-10
            border-b
            border-white/[0.08]
            pb-14
            md:grid-cols-[1fr_auto]
            md:items-end
          "
        >

          <div>

            <p
              className="
                text-sm
                uppercase
                tracking-[0.22em]
                text-white/30
              "
            >
              {settings.role}
            </p>


            <p
              className="
                mt-4
                max-w-2xl
                text-3xl
                font-semibold
                tracking-[-0.035em]
                text-white
                sm:text-5xl
              "
            >
              Have an idea worth
              building?
            </p>

          </div>


          <MagneticLink
            href="/#contact"
            className="
              primary-button
              w-fit
            "
            cursor="TALK"
          >
            Start a project

            <ArrowUpRight
              size={17}
            />
          </MagneticLink>

        </div>


        {/* =====================================================
            FOOTER LINKS
        ===================================================== */}

        <div
          className="
            grid
            gap-10
            py-10
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >

          {/* NAVIGATION */}

          <div>

            <span className="footer-label">
              Navigate
            </span>

            <div
              className="
                mt-4
                flex
                flex-col
                gap-2.5
              "
            >

              <Link
                href="/#about"
                className="
                  transition-colors
                  duration-300
                  hover:text-white
                "
              >
                About
              </Link>


              <Link
                href="/#projects"
                className="
                  transition-colors
                  duration-300
                  hover:text-white
                "
              >
                Projects
              </Link>


              <Link
                href="/#services"
                className="
                  transition-colors
                  duration-300
                  hover:text-white
                "
              >
                Services
              </Link>


              <Link
                href="/#contact"
                className="
                  transition-colors
                  duration-300
                  hover:text-white
                "
              >
                Contact
              </Link>

            </div>

          </div>


          {/* SOCIALS */}

          <div>

            <span className="footer-label">
              Connect
            </span>

            <div
              className="
                mt-4
                flex
                flex-col
                gap-2.5
              "
            >

              {socials.map(
                (social) => (
                  <Link
                    key={social.id}
                    href={social.url}
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
                      w-fit
                      transition-all
                      duration-300
                      hover:translate-x-1
                      hover:text-white
                    "
                  >
                    {
                      social.platform
                    }
                  </Link>
                )
              )}

            </div>

          </div>


          {/* LOCATION */}

          <div>

            <span className="footer-label">
              Based in
            </span>

            <p
              className="
                mt-4
                text-white/55
              "
            >
              {settings.location}
            </p>


            <a
              className="
                mt-2
                inline-block
                text-white/55
                transition
                duration-300
                hover:text-white
              "
              href={
                "mailto:" +
                settings.email
              }
            >
              {settings.email}
            </a>

          </div>

        </div>


        {/* =====================================================
            COPYRIGHT
        ===================================================== */}

        <div
          className="
            flex
            flex-wrap
            items-center
            justify-between
            gap-4
            border-t
            border-white/[0.08]
            pt-7
            text-xs
            text-white/30
          "
        >

          <p>
            ©{" "}
            {new Date().getFullYear()}{" "}
            {settings.name}. Built
            with care.
          </p>


          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="
              group/top
              flex
              items-center
              gap-2
              transition
              duration-300
              hover:text-white
            "
            data-cursor="TOP"
          >
            Back to top

            <ArrowUp
              size={14}
              className="
                transition-transform
                duration-300
                group-hover/top:-translate-y-1
              "
            />

          </button>

        </div>

      </div>


      {/* =====================================================
          LARGE PURUSOTTAM SECTION
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mt-4
          overflow-hidden
          border-t
          border-white/[0.035]
        "
      >

        {/* BACKGROUND LIGHT */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-full
            h-[350px]
            w-[80%]
            -translate-x-1/2
            -translate-y-1/3
            rounded-full
            bg-violet-500/[0.045]
            blur-[120px]
          "
        />


        {/* SMALL TOP LINE */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-px
            w-[38%]
            -translate-x-1/2
            bg-gradient-to-r
            from-transparent
            via-violet-300/30
            to-transparent
          "
        />


        {/* PURUSOTTAM */}

        <motion.div
          ref={nameRef}

          style={{
            y: nameY,
            scale: nameScale,
            opacity: nameOpacity,
          }}

          onPointerMove={(
            event
          ) => {
            const rect =
              event.currentTarget.getBoundingClientRect();

            event.currentTarget.style.setProperty(
              "--spotlight-x",
              `${
                event.clientX -
                rect.left
              }px`
            );

            event.currentTarget.style.setProperty(
              "--spotlight-y",
              `${
                event.clientY -
                rect.top
              }px`
            );
          }}

          className="
            group
            relative
            mx-auto
            flex
            min-h-[110px]
            w-full
            cursor-default
            select-none
            items-center
            justify-center
            overflow-hidden
            px-2
            pb-3
            pt-6

            sm:min-h-[150px]
            sm:px-4
            sm:pb-5
            sm:pt-8

            md:min-h-[190px]

            lg:min-h-[230px]

            xl:min-h-[270px]
          "

          aria-label="Purushottam"
        >

          {/* =============================================
              CURSOR SOFT GLOW
          ============================================= */}

          <span
            aria-hidden="true"

            className="
              pointer-events-none
              absolute
              z-0
              size-[180px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-white/[0.035]
              opacity-0
              blur-[45px]
              transition-opacity
              duration-500

              group-hover:opacity-100

              sm:size-[260px]
              sm:blur-[70px]

              lg:size-[340px]
            "

            style={{
              left:
                "var(--spotlight-x, 50%)",

              top:
                "var(--spotlight-y, 50%)",
            }}
          />


          {/* VIOLET CURSOR GLOW */}

          <span
            aria-hidden="true"

            className="
              pointer-events-none
              absolute
              z-0
              size-[120px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-violet-400/[0.07]
              opacity-0
              blur-[55px]
              transition-opacity
              duration-500

              group-hover:opacity-100

              sm:size-[200px]

              lg:size-[260px]
            "

            style={{
              left:
                "var(--spotlight-x, 50%)",

              top:
                "var(--spotlight-y, 50%)",
            }}
          />


          {/* =============================================
              MAIN PURUSOTTAM TEXT
          ============================================= */}

          <span
            aria-hidden="true"

            className="
              pointer-events-none
              relative
              z-10
              block
              w-full
              whitespace-nowrap
              text-center
              font-display

              text-[clamp(2.7rem,12.7vw,15rem)]

              font-black
              uppercase

              leading-[0.82]

              tracking-[-0.075em]

              text-white/[0.04]

              transition-all
              duration-500

              group-hover:text-white/[0.055]
            "
          >
            PURUSOTTAM
          </span>


          {/* =============================================
              SPOTLIGHT TEXT COPY
          ============================================= */}

          <span
            aria-hidden="true"

            className="
              pointer-events-none
              absolute
              inset-0
              z-20

              flex
              items-center
              justify-center

              whitespace-nowrap

              px-2
              pb-3
              pt-6

              text-center
              font-display

              text-[clamp(2.7rem,12.7vw,15rem)]

              font-black
              uppercase

              leading-[0.82]

              tracking-[-0.075em]

              opacity-0

              transition-opacity
              duration-500

              group-hover:opacity-100

              sm:px-4
              sm:pb-5
              sm:pt-8
            "

            style={{
              backgroundImage: `
                radial-gradient(
                  circle 230px at
                  var(--spotlight-x, 50%)
                  var(--spotlight-y, 50%),

                  rgba(255,255,255,0.95) 0%,

                  rgba(237,233,254,0.85) 14%,

                  rgba(196,181,253,0.62) 27%,

                  rgba(139,92,246,0.34) 42%,

                  rgba(255,255,255,0.10) 58%,

                  transparent 72%
                )
              `,

              WebkitBackgroundClip:
                "text",

              backgroundClip:
                "text",

              color:
                "transparent",
            }}
          >
            PURUSOTTAM
          </span>


          {/* =============================================
              SMALL BOTTOM GLOW
          ============================================= */}

          <span
            aria-hidden="true"

            className="
              pointer-events-none
              absolute
              bottom-1
              left-1/2
              h-px
              w-[55%]
              -translate-x-1/2
              bg-gradient-to-r
              from-transparent
              via-white/[0.08]
              to-transparent
            "
          />

        </motion.div>

      </div>

    </footer>
  );
}