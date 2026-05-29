"use client"

import { site } from "@/lib/site-content"

function MarqueeRow({ items, direction }: { items: string[], direction: "left" | "right" }) {
  const duplicated = [...items, ...items, ...items]

  return (
    <div className="overflow-hidden">
      <div className={`flex w-max items-center gap-6 whitespace-nowrap py-3 ${
        direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
      } hover:[animation-play-state:paused]`}>
        {duplicated.map((item, i) => (
          <div key={i} className="flex items-center gap-6">
            <span className="cursor-default font-serif text-2xl font-light text-[#888880] transition-all duration-500 hover:-translate-y-0.5 hover:text-[#F5F0E8]">
              {item}
            </span>
            <span className="text-lg text-[#C9A84C]/40">|</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ClientsMarquee() {
  const clients = site.home.clients

  return (
    <section className="relative overflow-hidden border-y border-[#C9A84C]/10 bg-[#0F0F0F] py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-4 size-44 rounded-full bg-[#C9A84C]/[0.03] blur-3xl animate-float-orb" />
        <div className="absolute bottom-0 right-0 size-56 rounded-full bg-[#C9A84C]/[0.02] blur-3xl animate-float-orb-reverse" />
      </div>

      <p className="relative mb-8 text-center font-ui text-[11px] uppercase tracking-[0.34em] text-[#888880]">
        {clients.label}
      </p>
      <div
        className="relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <div className="space-y-1">
          <MarqueeRow items={clients.rowOne} direction="left" />
          <MarqueeRow items={clients.rowTwo} direction="right" />
        </div>
      </div>
    </section>
  )
}
