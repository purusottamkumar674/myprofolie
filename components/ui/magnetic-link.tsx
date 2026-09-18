"use client";

import Link from "next/link";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  cursor?: string;
};

export function MagneticLink({ href, children, className, external, cursor = "OPEN" }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const move = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    event.currentTarget.style.transform = `translate3d(${x * 0.13}px,${y * 0.18}px,0)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
  };

  return (
    <Link
      ref={ref}
      href={href}
      className={cn("magnetic-link", className)}
      onMouseMove={move}
      onMouseLeave={reset}
      data-cursor={cursor}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {children}
    </Link>
  );
}
