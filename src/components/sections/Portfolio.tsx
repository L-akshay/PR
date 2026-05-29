"use client"

import Image from "next/image"

import ClosingCta from "@/components/ui/ClosingCta"
import FadeUp from "@/components/ui/FadeUp"
import PortfolioCard from "@/components/ui/PortfolioCard"
import SectionLabel from "@/components/ui/SectionLabel"
import { featuredCaseStudy, portfolioItems } from "@/lib/data/portfolio"
import { site } from "@/lib/site-content"

export default function Portfolio() {
  const page = site.caseStudiesPage

  return (
    <section className="px-5 py-18 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <FadeUp delay={0}>
          <div className="overflow-hidden rounded-[36px] border border-[#C9A84C]/15 bg-[#161616]">
            <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
              <div className="overflow-hidden">
                <Image
                  src={featuredCaseStudy.image}
                  alt={featuredCaseStudy.title}
                  width={1200}
                  height={900}
                  className="h-full min-h-[320px] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-[1.04]"
                />
              </div>
              <div className="p-8 lg:p-10">
                <p className="font-sans text-xs uppercase tracking-[0.24em] text-[#C9A84C]">
                  {featuredCaseStudy.client}
                </p>
                <h2 className="mt-6 font-serif text-4xl font-light leading-[0.96] text-[#F5F0E8]">
                  {featuredCaseStudy.title}
                </h2>
                <p className="mt-6 font-sans text-base leading-relaxed text-[#F5F0E8]">
                  {featuredCaseStudy.result}
                </p>
                <p className="mt-4 font-sans text-sm leading-relaxed text-[#888880]">
                  {featuredCaseStudy.excerpt}
                </p>
              </div>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="mt-16">
            <SectionLabel
              label={page.includedIntro.label}
              title={page.includedIntro.title}
              description={page.includedIntro.description}
              className="max-w-4xl"
            />
          </div>
        </FadeUp>

        <div className="mt-14 grid gap-6 xl:grid-cols-2">
          {portfolioItems.map((item, index) => (
            <FadeUp key={item.id} delay={index * 0.05} className="h-full">
              <PortfolioCard item={item} />
            </FadeUp>
          ))}
        </div>

      </div>

      <ClosingCta
        eyebrow={page.closing.eyebrow}
        heading={page.closing.heading}
        supporting={page.closing.supporting}
        primaryCta={page.closing.primaryCta}
      />
    </section>
  )
}
