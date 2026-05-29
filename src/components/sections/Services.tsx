"use client"

import Image from "next/image"

import FadeUp from "@/components/ui/FadeUp"
import GoldButton from "@/components/ui/GoldButton"
import SectionLabel from "@/components/ui/SectionLabel"
import ServiceTagTicker from "@/components/ui/ServiceTagTicker"
import { allServiceGroups, services } from "@/lib/data/services"
import { site } from "@/lib/site-content"

export default function Services() {
  const content = site.servicesPage

  return (
    <section className="relative overflow-hidden px-5 py-18 lg:px-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-12 size-64 rounded-full bg-[#C9A84C]/[0.04] blur-3xl animate-float-orb" />
        <div className="absolute bottom-0 right-0 size-72 rounded-full bg-[#C9A84C]/[0.03] blur-3xl animate-float-orb-reverse" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <FadeUp delay={0}>
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-end">
            <div className="rounded-[36px] border border-[#C9A84C]/15 bg-[#161616] p-8 lg:p-10">
              <SectionLabel
                label={content.intro.label}
                title={content.intro.title}
                description={content.intro.description}
                className="max-w-4xl"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {content.highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[28px] border border-[#C9A84C]/12 bg-[#161616] p-6"
                >
                  <p className="font-serif text-3xl font-light text-[#F5F0E8]">
                    {item.value}
                  </p>
                  <p className="mt-3 font-ui text-[11px] uppercase tracking-[0.3em] text-[#C9A84C]">
                    {item.label}
                  </p>
                  <p className="mt-4 font-ui text-sm leading-relaxed text-[#888880]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.06}>
          <ServiceTagTicker className="mt-10" duration="34s" />
        </FadeUp>

        <div className="mt-20 space-y-10">
          {services.map((service, index) => (
            <FadeUp key={service.slug} delay={Math.min(index * 0.05, 0.18)}>
              <article className="group relative overflow-hidden rounded-[38px] border border-[#C9A84C]/15 bg-[#161616]">
                <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/65 to-transparent" />

                <div className="grid xl:grid-cols-[0.9fr_1.1fr]">
                  <div className={index % 2 === 0 ? "xl:order-1" : "xl:order-2"}>
                    <div className="relative h-full min-h-[320px] overflow-hidden xl:min-h-[100%]">
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={1200}
                        height={1080}
                        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.05]"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,15,15,0.9)_0%,rgba(15,15,15,0.28)_45%,rgba(15,15,15,0.08)_100%)]" />

                      <div className="absolute left-6 top-6 inline-flex items-center gap-3 rounded-full border border-[#C9A84C]/20 bg-[rgba(15,15,15,0.72)] px-4 py-2 backdrop-blur">
                        <span className="font-ui text-[11px] uppercase tracking-[0.28em] text-[#C9A84C]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="h-3 w-px bg-[#C9A84C]/25" />
                        <span className="font-ui text-[11px] uppercase tracking-[0.24em] text-[#F5F0E8]">
                          {service.shortLabel}
                        </span>
                      </div>

                      <div className="absolute inset-x-6 bottom-6 flex flex-wrap gap-2">
                        {service.keywords.slice(0, 3).map((keyword) => (
                          <span
                            key={keyword}
                            className="rounded-full border border-[#C9A84C]/20 bg-[rgba(15,15,15,0.72)] px-4 py-2 font-ui text-[11px] uppercase tracking-[0.22em] text-[#C9A84C] backdrop-blur"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={index % 2 === 0 ? "xl:order-2" : "xl:order-1"}>
                    <div className="p-8 lg:p-10">
                      <p className="font-ui text-[11px] uppercase tracking-[0.34em] text-[#C9A84C]">
                        {service.eyebrow}
                      </p>
                      <h2 className="mt-5 font-serif text-4xl font-light leading-[0.98] text-[#F5F0E8] sm:text-5xl">
                        {service.title}
                      </h2>
                      <p className="mt-6 font-ui text-[15px] leading-[1.9] text-[#F5F0E8] sm:text-[17px]">
                        {service.description}
                      </p>
                      <p className="mt-5 font-ui text-[15px] leading-[1.9] text-[#888880] sm:text-[17px]">
                        {service.longDescription}
                      </p>

                      <div className="mt-8 grid gap-3 sm:grid-cols-2">
                        {service.subServices.map((item) => (
                          <div
                            key={item}
                            className="rounded-[22px] border border-[#C9A84C]/10 bg-[#111111] px-4 py-4 font-ui text-sm leading-relaxed text-[#888880]"
                          >
                            {item}
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 grid gap-3 sm:grid-cols-3">
                        {service.metrics.map((metric) => (
                          <div
                            key={metric.label}
                            className="rounded-[24px] border border-[#C9A84C]/12 bg-[#0F0F0F] p-5"
                          >
                            <p className="font-serif text-4xl font-light text-[#C9A84C]">
                              {metric.value}
                            </p>
                            <p className="mt-2 font-ui text-[10px] uppercase tracking-[0.24em] text-[#F5F0E8]">
                              {metric.label}
                            </p>
                          </div>
                        ))}
                      </div>

                      <GoldButton href={`/services/${service.slug}`} className="mt-8">
                        {content.serviceCtaLabel}
                      </GoldButton>
                    </div>
                  </div>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.1}>
          <div className="mt-24 grid gap-8 xl:grid-cols-[0.88fr_1.12fr]">
            <div className="rounded-[36px] border border-[#C9A84C]/15 bg-[#161616] p-8 lg:p-10">
              <SectionLabel
                label={content.fullList.label}
                title={content.fullList.title}
                description={content.fullList.description}
                className="max-w-3xl"
              />
              <GoldButton href={content.fullList.cta.href} className="mt-8">
                {content.fullList.cta.label}
              </GoldButton>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {allServiceGroups.map((group) => (
                <article
                  key={group.title}
                  className="rounded-[30px] border border-[#C9A84C]/12 bg-[#161616] p-7"
                >
                  <h3 className="font-serif text-[30px] font-light leading-[1.02] text-[#F5F0E8]">
                    {group.title}
                  </h3>
                  <div className="mt-6 space-y-3">
                    {group.items.map((item) => (
                      <p key={item} className="font-ui text-sm leading-relaxed text-[#888880]">
                        {item}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
