"use client"

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import FadeUp from "@/components/ui/FadeUp"
import SectionLabel from "@/components/ui/SectionLabel"
import { heroStats } from "@/lib/data/stats"
import { site } from "@/lib/site-content"

function StatCard({
  value,
  label,
  delay,
  className,
}: {
  value: string
  label: string
  delay: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={`rounded-[18px] border border-[#C9A84C]/20 bg-[#161616]/90 px-5 py-4 text-center shadow-[0_18px_40px_rgba(15,15,15,0.18)] backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1 hover:border-[#C9A84C]/35 sm:rounded-[20px] sm:px-6 sm:py-5 sm:text-left ${className ?? ""}`}
    >
      <p className="font-serif text-[clamp(28px,7vw,36px)] font-light text-[#C9A84C]">
        {value}
      </p>
      <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.18em] text-[#888880] sm:text-xs sm:tracking-[0.2em]">
        {label}
      </p>
    </motion.div>
  )
}

export default function WhyChoosePR() {
  const content = site.home.whyChoosePr

  return (
    <section className="bg-[#0F0F0F] px-5 py-20 md:py-24 lg:px-16">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <FadeUp delay={0}>
          <SectionLabel
            label={content.label}
            title={content.title}
            description={content.description}
          />

          <div className="mt-10">
            {content.checklist.map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="group relative flex cursor-default items-center gap-5 border-b border-[#2a2a2a] py-[14px] last:border-b-0"
              >
                <span className="pointer-events-none absolute inset-0 rounded-[8px] bg-[#C9A84C]/[0.04] opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:opacity-100 group-active:opacity-100" />
                <span className="pointer-events-none absolute left-0 top-1/2 h-0 w-[2px] -translate-x-1 -translate-y-1/2 rounded-full bg-[#C9A84C] opacity-0 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:h-6 group-hover:translate-x-0 group-hover:opacity-100 group-active:h-6 group-active:translate-x-0 group-active:opacity-100" />

                <span className="w-7 shrink-0 pl-3 font-serif text-xs tracking-[0.16em] text-[#C9A84C]/30 transition-colors duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:text-[#C9A84C] group-active:text-[#C9A84C]">
                  {item.number}
                </span>

                <p className="flex-1 font-sans text-sm leading-relaxed text-[#888880] transition-colors duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:text-[#F5F0E8] group-active:text-[#F5F0E8]">
                  {item.text}
                </p>

                <span className="flex w-6 shrink-0 justify-end overflow-hidden">
                  <span className="h-px w-0 translate-x-2 bg-[#C9A84C] opacity-0 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:w-6 group-hover:translate-x-0 group-hover:opacity-100 group-active:w-6 group-active:translate-x-0 group-active:opacity-100" />
                </span>
              </motion.div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="relative">
            <div className="group relative hidden aspect-[5/4] overflow-hidden rounded-[32px] border border-[#C9A84C]/15 shadow-[0_24px_70px_rgba(15,15,15,0.18)] sm:block xl:aspect-[11/10]">
              <Image
                src={content.image}
                alt={content.imageAlt}
                width={900}
                height={1040}
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.04] group-active:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-[linear-gradient(to_top,rgba(15,15,15,0.76)_0%,rgba(15,15,15,0.22)_46%,transparent_74%)] transition-opacity duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:opacity-100 group-active:opacity-100" />
              <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_82%_18%,rgba(201,168,76,0.16),transparent_24%)] opacity-80" />

              <div className="pointer-events-none absolute inset-6 hidden lg:flex">
                <div className="mt-auto">
                  <StatCard
                    value={heroStats[0]?.value ?? ""}
                    label={heroStats[0]?.label ?? ""}
                    delay={0.4}
                    className="w-[240px] xl:w-[260px]"
                  />
                </div>

                <div className="ml-auto flex h-full flex-col justify-between items-end">
                  <StatCard
                    value={heroStats[2]?.value ?? ""}
                    label={heroStats[2]?.label ?? ""}
                    delay={0.5}
                    className="w-[220px] xl:w-[240px]"
                  />
                  <StatCard
                    value={heroStats[1]?.value ?? ""}
                    label={heroStats[1]?.label ?? ""}
                    delay={0.6}
                    className="w-[220px] xl:w-[240px]"
                  />
                </div>
              </div>
            </div>

            <div className="relative z-10 mx-auto grid max-w-[270px] grid-cols-1 justify-items-center gap-3 sm:max-w-none sm:grid-cols-2 sm:justify-items-stretch lg:hidden">
              <StatCard
                value={heroStats[0]?.value ?? ""}
                label={heroStats[0]?.label ?? ""}
                delay={0.4}
                className="w-full"
              />
              <StatCard
                value={heroStats[2]?.value ?? ""}
                label={heroStats[2]?.label ?? ""}
                delay={0.5}
                className="w-full"
              />
              <StatCard
                value={heroStats[1]?.value ?? ""}
                label={heroStats[1]?.label ?? ""}
                delay={0.6}
                className="w-full sm:col-span-2 sm:max-w-[calc(50%-0.375rem)]"
              />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
