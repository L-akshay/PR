import Image from "next/image"
import Link from "next/link"

import FadeUp from "@/components/ui/FadeUp"
import SectionLabel from "@/components/ui/SectionLabel"
import { site } from "@/lib/site-content"

export default function WhatWeDo() {
  const content = site.home.whatWeDo

  return (
    <section className="relative overflow-hidden px-5 py-18 md:py-24 lg:px-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-14 size-56 rounded-full bg-[#C9A84C]/[0.04] blur-3xl animate-float-orb" />
        <div className="absolute bottom-8 right-0 size-72 rounded-full bg-[#C9A84C]/[0.03] blur-3xl animate-float-orb-reverse" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.92fr_1.08fr]">
        <FadeUp delay={0}>
          <div className="group relative overflow-hidden rounded-[32px] border border-[#C9A84C]/15 shadow-[0_28px_90px_rgba(15,15,15,0.22)]">
            <Image
              src={content.image}
              alt={content.imageAlt}
              width={900}
              height={1040}
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.05]"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(15,15,15,0.42)_0%,rgba(15,15,15,0.08)_40%,rgba(15,15,15,0)_78%)] opacity-80 transition-opacity duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:opacity-100" />
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="rounded-[32px] border border-[#C9A84C]/10 bg-[linear-gradient(180deg,rgba(22,22,22,0.82)_0%,rgba(15,15,15,0.58)_100%)] p-8 shadow-[0_22px_70px_rgba(15,15,15,0.18)] backdrop-blur-sm lg:p-10">
            <SectionLabel
              label={content.label}
              title={content.title}
              description={content.description}
            />
            <Link
              href={content.cta.href}
              className="group mt-8 inline-flex min-h-11 items-center gap-3 font-ui text-[11px] uppercase tracking-[0.28em] text-[#C9A84C] transition-colors duration-700 hover:text-[#F5F0E8]"
            >
              <span>{content.cta.label}</span>
              <span className="h-px w-10 bg-[#C9A84C] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:w-14 group-hover:bg-[#F5F0E8]" />
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
