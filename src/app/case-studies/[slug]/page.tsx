import Link from "next/link"
import { notFound } from "next/navigation"

import ClosingCta from "@/components/ui/ClosingCta"
import FadeUp from "@/components/ui/FadeUp"
import PageHero from "@/components/ui/PageHero"
import { portfolioItems } from "@/lib/data/portfolio"
import { site } from "@/lib/site-content"

type CaseStudyPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return portfolioItems.map((item) => ({ slug: item.slug }))
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const item = portfolioItems.find((portfolioItem) => portfolioItem.slug === slug)

  if (!item) {
    notFound()
  }
  const detail = site.caseStudiesPage.detail

  return (
    <>
      <PageHero
        title={item.title}
        description={item.excerpt}
        image={item.image}
      />

      <section className="px-5 py-20 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <FadeUp delay={0}>
            <div className="mb-12 flex flex-col gap-6 border-b border-[#2A2A2A] pb-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="font-ui text-[11px] uppercase tracking-[0.28em] text-[#C9A84C]">
                  {item.client}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <span className="rounded-full border border-[#C9A84C]/20 px-4 py-2 font-sans text-[11px] uppercase tracking-[0.22em] text-[#C9A84C]">
                    {item.category}
                  </span>
                  <span className="rounded-full border border-[#2A2A2A] px-4 py-2 font-sans text-[11px] uppercase tracking-[0.22em] text-[#888880]">
                    {item.market}
                  </span>
                  <span className="rounded-full border border-[#2A2A2A] px-4 py-2 font-sans text-[11px] uppercase tracking-[0.22em] text-[#888880]">
                    {item.engagementDuration}
                  </span>
                </div>
              </div>

              <Link
                href="/case-studies"
                className="font-sans text-xs uppercase tracking-[0.24em] text-[#888880] transition-colors duration-300 hover:text-[#C9A84C]"
              >
                {detail.backLabel}
              </Link>
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            <div className="rounded-[30px] border border-[#C9A84C]/15 bg-[#161616] p-7 lg:p-9">
              <p className="font-ui text-[11px] uppercase tracking-[0.28em] text-[#C9A84C]">
                {detail.summaryLabel}
              </p>
              <p className="mt-5 max-w-4xl font-serif text-3xl font-light leading-[1.12] text-[#F5F0E8] lg:text-4xl">
                {item.result}
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {item.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[24px] border border-[#2A2A2A] bg-[#161616] px-6 py-6 text-center"
                >
                  <p className="font-serif text-4xl font-light text-[#C9A84C]">
                    {metric.value}
                  </p>
                  <p className="mt-2 font-sans text-xs uppercase tracking-[0.2em] text-[#888880]">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {[
              { label: detail.blocks[0], content: item.situation },
              { label: detail.blocks[1], content: item.strategy },
              { label: detail.blocks[2], content: item.execution },
            ].map((block, index) => (
              <FadeUp key={block.label} delay={0.15 + index * 0.05}>
                <div className="h-full rounded-[28px] border border-[#2A2A2A] bg-[#161616] p-7">
                  <p className="mb-4 font-sans text-xs uppercase tracking-[0.24em] text-[#C9A84C]">
                    {block.label}
                  </p>
                  <div className="mb-5 h-px w-10 bg-[#C9A84C]/40" />
                  <p className="font-sans text-sm leading-relaxed text-[#888880]">
                    {block.content}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.35}>
            <div className="mt-14 rounded-[32px] border border-[#C9A84C]/15 bg-[#161616] p-7 lg:p-9">
              <div className="max-w-3xl">
                <p className="font-ui text-[11px] uppercase tracking-[0.28em] text-[#C9A84C]">
                  {detail.resultsLabel}
                </p>
                <h2 className="mt-5 font-serif text-4xl font-light leading-[0.98] text-[#F5F0E8]">
                  {detail.resultsHeading}
                </h2>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {item.results.map((result) => (
                  <div
                    key={result.label}
                    className="rounded-[24px] border border-[#2A2A2A] bg-[#0F0F0F] p-6"
                  >
                    <p className="font-sans text-xs uppercase tracking-[0.22em] text-[#C9A84C]">
                      {result.label}
                    </p>
                    <p className="mt-4 font-serif text-2xl font-light leading-[1.15] text-[#F5F0E8]">
                      {result.value}
                    </p>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-[#888880]">
                      {result.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

        </div>
      </section>

      <ClosingCta
        eyebrow={detail.closing.eyebrow}
        primaryCta={detail.closing.primaryCta}
      />
    </>
  )
}
