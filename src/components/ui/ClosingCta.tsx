"use client"

import Link from "next/link"
import * as React from "react"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

type CtaLink = {
  href: string
  label: string
}

type ClosingCtaProps = {
  eyebrow?: string
  heading?: React.ReactNode | string[]
  supporting?: React.ReactNode
  primaryCta?: CtaLink
  secondaryCta?: CtaLink
  className?: string
}

export default function ClosingCta({
  eyebrow,
  heading,
  supporting,
  primaryCta,
  secondaryCta,
  className,
}: ClosingCtaProps) {
  const headingArray = Array.isArray(heading) ? heading : null
  const headingNode =
    headingArray === null && heading !== undefined ? heading : null

  return (
    <section
      className={cn(
        "relative overflow-hidden px-5 py-24 lg:px-16 lg:py-32",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

        <div className="absolute left-1/2 top-[8%] size-[620px] -translate-x-1/2 rounded-full bg-[#C9A84C]/[0.055] blur-[140px] animate-projects-closing-drift" />
        <div className="absolute -left-16 bottom-0 size-[360px] rounded-full bg-[#C9A84C]/[0.035] blur-[120px] animate-float-orb" />
        <div className="absolute -right-12 top-24 size-[320px] rounded-full bg-[#C9A84C]/[0.03] blur-[120px] animate-float-orb-reverse" />
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        {eyebrow ? (
          <div className="inline-flex items-center gap-3 animate-fade-up-reveal">
            <span
              className="size-[6px] rounded-full bg-[#C9A84C] shadow-[0_0_12px_rgba(201,168,76,0.55)] animate-gold-dot-pulse"
              aria-hidden
            />
            <p className="font-ui text-[11px] uppercase tracking-[0.38em] text-[#C9A84C]">
              {eyebrow}
            </p>
            <span
              className="size-[6px] rounded-full bg-[#C9A84C] shadow-[0_0_12px_rgba(201,168,76,0.55)] animate-gold-dot-pulse"
              aria-hidden
            />
          </div>
        ) : null}

        <span
          className={cn(
            "mx-auto block h-px w-32 origin-center bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent",
            eyebrow ? "mt-6" : "mt-0"
          )}
        />

        {headingArray ? (
          <h2 className="mt-10 font-serif text-[clamp(36px,4.6vw,64px)] font-light leading-[1.04] text-[#F5F0E8]">
            {headingArray.map((phrase, index) => (
              <span key={phrase} className="block overflow-hidden pb-1">
                <span
                  className="inline-block animate-fade-up-reveal"
                  style={{ animationDelay: `${0.1 + index * 0.12}s` }}
                >
                  {phrase}
                </span>
              </span>
            ))}
          </h2>
        ) : headingNode ? (
          <h2 className="mt-10 font-serif text-[clamp(36px,4.6vw,64px)] font-light leading-[1.04] text-[#F5F0E8]">
            <span className="block overflow-hidden pb-1">
              <span className="inline-block animate-fade-up-reveal">
                {headingNode}
              </span>
            </span>
          </h2>
        ) : null}

        {supporting ? (
          <p className="mx-auto mt-7 max-w-2xl font-ui text-[15px] leading-[1.9] text-[#888880] animate-fade-up-reveal sm:text-[17px]">
            {supporting}
          </p>
        ) : null}

        {primaryCta || secondaryCta ? (
          <div className="mt-12 flex flex-col items-center justify-center gap-4 animate-fade-up-reveal sm:flex-row">
            {primaryCta ? (
              <ClosingCtaPrimary
                href={primaryCta.href}
                label={primaryCta.label}
              />
            ) : null}
            {secondaryCta ? (
              <ClosingCtaSecondary
                href={secondaryCta.href}
                label={secondaryCta.label}
              />
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  )
}

function ClosingCtaPrimary({ href, label }: CtaLink) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center"
      aria-label={label}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.28)_0%,rgba(201,168,76,0)_72%)] opacity-0 blur-xl transition-opacity duration-[900ms] ease-[cubic-bezier(0.22,0.08,0.2,1)] group-hover:opacity-100 group-focus-visible:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-full shadow-[0_0_0_1px_rgba(201,168,76,0)] transition-shadow duration-[900ms] ease-[cubic-bezier(0.22,0.08,0.2,1)] group-hover:shadow-[0_0_0_1px_rgba(201,168,76,0.35),0_22px_45px_-18px_rgba(201,168,76,0.55)]"
      />

      <span className="relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full border border-[#C9A84C] bg-[#C9A84C] px-9 py-3.5 font-sans text-xs uppercase tracking-[0.24em] text-[#0F0F0F] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,0.08,0.2,1)] group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-[rgba(245,240,232,0.26)] opacity-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.22,0.08,0.2,1)] group-hover:left-[115%] group-hover:opacity-100 group-focus-visible:left-[115%] group-focus-visible:opacity-100"
        />

        <span className="relative z-10 flex items-center gap-3">
          {label}
          <ArrowRight className="size-4 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,0.08,0.2,1)] group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5" />
        </span>
      </span>
    </Link>
  )
}

function ClosingCtaSecondary({ href, label }: CtaLink) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center"
      aria-label={label}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-full shadow-[0_0_0_1px_rgba(201,168,76,0)] transition-shadow duration-[900ms] ease-[cubic-bezier(0.22,0.08,0.2,1)] group-hover:shadow-[0_0_0_1px_rgba(201,168,76,0.35)]"
      />

      <span className="relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full border border-[#C9A84C]/60 bg-transparent px-9 py-3.5 font-sans text-xs uppercase tracking-[0.24em] text-[#C9A84C] transition-all duration-[900ms] ease-[cubic-bezier(0.22,0.08,0.2,1)] group-hover:-translate-y-0.5 group-hover:border-[#C9A84C] group-hover:text-[#F5F0E8] group-focus-visible:-translate-y-0.5 group-focus-visible:border-[#C9A84C] group-focus-visible:text-[#F5F0E8] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        <span className="relative z-10 flex items-center gap-3">
          {label}
          <ArrowRight className="size-4 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,0.08,0.2,1)] group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5" />
        </span>
      </span>
    </Link>
  )
}
