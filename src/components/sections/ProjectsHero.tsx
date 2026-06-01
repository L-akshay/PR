"use client"

import Link from "next/link"

import { projectsPageIntro } from "@/lib/data/projects"

export default function ProjectsHero() {
  return (
    <section className="relative overflow-hidden border-b border-[#C9A84C]/10 px-5 pt-36 pb-20 lg:px-16 lg:pt-44 lg:pb-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-16 size-[460px] rounded-full bg-[#C9A84C]/[0.05] blur-[120px] animate-float-orb" />
        <div className="absolute -right-16 bottom-0 size-[420px] rounded-full bg-[#C9A84C]/[0.04] blur-[120px] animate-float-orb-reverse" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/25 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center gap-3 font-ui text-[11px] uppercase tracking-[0.28em] text-[#888880] animate-fade-up-reveal">
          <Link
            href="/"
            className="transition-colors duration-[700ms] hover:text-[#C9A84C]"
          >
            {projectsPageIntro.homeLabel}
          </Link>
          <span className="text-[#C9A84C]">/</span>
          <span className="text-[#F5F0E8]">{projectsPageIntro.currentLabel}</span>
        </div>

        <div
          className="mt-10 inline-flex flex-col animate-fade-up-reveal"
          style={{ animationDelay: "0.1s" }}
        >
          <p className="font-ui text-[11px] uppercase tracking-[0.4em] text-[#C9A84C]">
            {projectsPageIntro.label}
          </p>
          <span className="mt-5 h-px w-32 origin-left bg-gradient-to-r from-[#C9A84C] via-[#C9A84C]/60 to-transparent" />
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
          <h1
            className="font-serif text-[clamp(38px,5.2vw,72px)] font-light leading-[1.04] text-[#F5F0E8] animate-fade-up-reveal"
            style={{ animationDelay: "0.18s" }}
          >
            {projectsPageIntro.heading}
          </h1>

          <div
            className="flex flex-col gap-8 animate-fade-up-reveal"
            style={{ animationDelay: "0.34s" }}
          >
            <p className="font-serif text-[clamp(22px,2.4vw,32px)] font-light leading-[1.25] text-[#F5F0E8]/92">
              {projectsPageIntro.supporting}
            </p>

            <div className="relative overflow-hidden rounded-[28px] border border-[#C9A84C]/15 bg-[#141414] p-7 sm:p-8">
              <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />
              <p className="font-ui text-[10px] uppercase tracking-[0.32em] text-[#C9A84C]">
                {projectsPageIntro.noteLabel}
              </p>
              <p className="mt-5 font-ui text-[15px] leading-[1.9] text-[#888880] sm:text-[16px]">
                {projectsPageIntro.note}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
