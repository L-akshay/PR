"use client"

import * as React from "react"
import Image from "next/image"
import { animate, useMotionValue } from "framer-motion"

import FadeUp from "@/components/ui/FadeUp"
import SectionLabel from "@/components/ui/SectionLabel"
import { performanceStats } from "@/lib/data/stats"
import { site } from "@/lib/site-content"

function Stat({
  value,
  label,
  description,
  delay,
}: {
  value: number
  label: string
  description: string
  delay: number
}) {
  const motionValue = useMotionValue(0)
  // Seed with the real value so the number is correct even if the count-up
  // animation never runs (production framer mount animations can be deferred).
  const [display, setDisplay] = React.useState(value)

  React.useEffect(() => {
    const unsubscribe = motionValue.on("change", (latest) => {
      setDisplay(Math.round(latest))
    })

    return unsubscribe
  }, [motionValue])

  React.useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 0.8,
      delay,
      ease: [0.25, 0.1, 0.25, 1],
    })

    return () => controls.stop()
  }, [delay, motionValue, value])

  return (
    <div className="rounded-[24px] border border-[#C9A84C]/10 bg-[#0F0F0F] p-6 shadow-[0_18px_50px_rgba(15,15,15,0.18)] transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1 hover:border-[#C9A84C]/20">
      <p className="font-serif text-5xl font-light text-[#C9A84C]">{display}%</p>
      <p className="mt-3 font-ui text-[11px] uppercase tracking-[0.28em] text-[#F5F0E8]">
        {label}
      </p>
      <p className="mt-3 font-ui text-sm leading-[1.9] text-[#888880]">
        {description}
      </p>
    </div>
  )
}

export default function WhyChooseUs() {
  const content = site.home.whyChooseUs

  return (
    <section className="relative overflow-hidden bg-[#161616] px-5 py-18 md:py-24 lg:px-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-12 size-56 rounded-full bg-[#C9A84C]/[0.04] blur-3xl animate-float-orb" />
        <div className="absolute bottom-6 right-0 size-72 rounded-full bg-[#C9A84C]/[0.03] blur-3xl animate-float-orb-reverse" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[0.95fr_1.05fr]">
        <FadeUp delay={0}>
          <div className="group relative overflow-hidden rounded-[32px] border border-[#C9A84C]/15 shadow-[0_28px_90px_rgba(15,15,15,0.22)]">
            <Image
              src={content.image}
              alt={content.imageAlt}
              width={900}
              height={1040}
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.05]"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(15,15,15,0.48)_0%,rgba(15,15,15,0.1)_40%,rgba(15,15,15,0)_78%)] opacity-80 transition-opacity duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:opacity-100" />
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="rounded-[32px] border border-[#C9A84C]/10 bg-[linear-gradient(180deg,rgba(22,22,22,0.85)_0%,rgba(15,15,15,0.58)_100%)] p-8 shadow-[0_24px_80px_rgba(15,15,15,0.18)] backdrop-blur-sm lg:p-10">
            <SectionLabel
              label={content.label}
              title={content.title}
              description={content.description}
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {performanceStats.map((stat, index) => (
                <Stat
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  description={stat.description}
                  delay={Math.min(index * 0.1, 0.4)}
                />
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
