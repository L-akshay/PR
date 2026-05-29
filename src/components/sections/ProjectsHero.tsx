"use client"

import Link from "next/link"
import { motion } from "framer-motion"

import { projectsPageIntro } from "@/lib/data/projects"

const EASE = [0.22, 0.08, 0.2, 1] as const

export default function ProjectsHero() {
  return (
    <section className="relative overflow-hidden border-b border-[#C9A84C]/10 px-5 pt-36 pb-20 lg:px-16 lg:pt-44 lg:pb-24">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
          className="absolute -left-24 top-16 size-[460px] rounded-full bg-[#C9A84C]/[0.05] blur-[120px] animate-float-orb"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, ease: EASE, delay: 0.2 }}
          className="absolute -right-16 bottom-0 size-[420px] rounded-full bg-[#C9A84C]/[0.04] blur-[120px] animate-float-orb-reverse"
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/25 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-wrap items-center gap-3 font-ui text-[11px] uppercase tracking-[0.28em] text-[#888880]"
        >
          <Link
            href="/"
            className="transition-colors duration-[700ms] hover:text-[#C9A84C]"
          >
            {projectsPageIntro.homeLabel}
          </Link>
          <span className="text-[#C9A84C]">/</span>
          <span className="text-[#F5F0E8]">{projectsPageIntro.currentLabel}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
          className="mt-10 inline-flex flex-col"
        >
          <p className="font-ui text-[11px] uppercase tracking-[0.4em] text-[#C9A84C]">
            {projectsPageIntro.label}
          </p>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.4 }}
            className="mt-5 h-px w-32 origin-left bg-gradient-to-r from-[#C9A84C] via-[#C9A84C]/60 to-transparent"
          />
        </motion.div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.18 }}
            className="font-serif text-[clamp(38px,5.2vw,72px)] font-light leading-[1.04] text-[#F5F0E8]"
          >
            {projectsPageIntro.heading}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.34 }}
            className="flex flex-col gap-8"
          >
            <p className="font-serif text-[clamp(22px,2.4vw,32px)] font-light leading-[1.25] text-[#F5F0E8]/92">
              {projectsPageIntro.supporting}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.5 }}
              className="relative overflow-hidden rounded-[28px] border border-[#C9A84C]/15 bg-[#141414] p-7 sm:p-8"
            >
              <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />
              <p className="font-ui text-[10px] uppercase tracking-[0.32em] text-[#C9A84C]">
                {projectsPageIntro.noteLabel}
              </p>
              <p className="mt-5 font-ui text-[15px] leading-[1.9] text-[#888880] sm:text-[16px]">
                {projectsPageIntro.note}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
