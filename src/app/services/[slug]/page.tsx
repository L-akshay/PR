import Image from "next/image"
import { notFound } from "next/navigation"

import ClosingCta from "@/components/ui/ClosingCta"
import FadeUp from "@/components/ui/FadeUp"
import GhostButton from "@/components/ui/GhostButton"
import GoldButton from "@/components/ui/GoldButton"
import PageHero from "@/components/ui/PageHero"
import SectionLabel from "@/components/ui/SectionLabel"
import ServiceCard from "@/components/ui/ServiceCard"
import { getServiceBySlug, services } from "@/lib/data/services"
import { site } from "@/lib/site-content"

type ServicePageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export default async function ServiceDetailPage({
  params,
}: ServicePageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const relatedServices = services
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3)
  const detail = site.servicesPage.detail

  return (
    <>
      <PageHero
        title={service.title}
        description={service.description}
        image={service.heroImage}
      />

      <section className="relative overflow-hidden px-5 py-18 lg:px-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-14 size-56 rounded-full bg-[#C9A84C]/[0.04] blur-3xl animate-float-orb" />
          <div className="absolute bottom-0 right-0 size-72 rounded-full bg-[#C9A84C]/[0.03] blur-3xl animate-float-orb-reverse" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-10 xl:grid-cols-[0.94fr_1.06fr]">
            <FadeUp delay={0}>
              <div className="rounded-[36px] border border-[#C9A84C]/15 bg-[#161616] p-8 lg:p-10">
                <p className="font-ui text-[11px] uppercase tracking-[0.32em] text-[#C9A84C]">
                  {detail.focusLabel}
                </p>
                <h2 className="mt-6 font-serif text-4xl font-light leading-[0.98] text-[#F5F0E8] sm:text-5xl">
                  {service.eyebrow}
                </h2>
                <p className="mt-6 font-ui text-[15px] leading-[1.9] text-[#888880] sm:text-[17px]">
                  {service.longDescription}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {service.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border border-[#C9A84C]/20 px-4 py-2 font-ui text-[11px] uppercase tracking-[0.22em] text-[#C9A84C]"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                <div className="mt-8 rounded-[28px] border border-[#C9A84C]/12 bg-[#111111] p-6">
                  <p className="font-ui text-[11px] uppercase tracking-[0.28em] text-[#C9A84C]">
                    {detail.whyLabel}
                  </p>
                  <p className="mt-4 font-ui text-[15px] leading-[1.9] text-[#F5F0E8] sm:text-[17px]">
                    {service.intro}
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <GoldButton href={detail.startCta.href}>{detail.startCta.label}</GoldButton>
                  <GhostButton href={detail.allServicesCta.href}>{detail.allServicesCta.label}</GhostButton>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.08}>
              <div className="space-y-5">
                <div className="overflow-hidden rounded-[36px] border border-[#C9A84C]/15">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={1280}
                    height={1120}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-[1.05] xl:aspect-[4/5]"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {service.metrics.map((metric) => (
                    <article
                      key={metric.label}
                      className="rounded-[26px] border border-[#C9A84C]/12 bg-[#161616] p-6"
                    >
                      <p className="font-serif text-4xl font-light text-[#C9A84C]">
                        {metric.value}
                      </p>
                      <p className="mt-2 font-ui text-[10px] uppercase tracking-[0.24em] text-[#F5F0E8]">
                        {metric.label}
                      </p>
                      <p className="mt-3 font-ui text-sm leading-relaxed text-[#888880]">
                        {metric.detail}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.1}>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {service.subServices.map((item) => (
                <article
                  key={item}
                  className="rounded-[26px] border border-[#C9A84C]/12 bg-[#161616] p-6"
                >
                  <p className="font-ui text-sm leading-relaxed text-[#888880]">
                    {item}
                  </p>
                </article>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="bg-[#161616] px-5 py-18 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <FadeUp delay={0}>
            <SectionLabel
              label={detail.processIntro.label}
              title={detail.processIntro.title}
              description={detail.processIntro.description}
              align="center"
              className="mx-auto max-w-4xl"
            />
          </FadeUp>

          <div className="mt-14 grid gap-5 lg:grid-cols-4">
            {service.process.map((step, index) => (
              <FadeUp key={step.title} delay={Math.min(index * 0.08, 0.24)}>
                <article className="relative h-full overflow-hidden rounded-[30px] border border-[#C9A84C]/12 bg-[#0F0F0F] p-7">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/65 to-transparent" />
                  <p className="font-serif text-5xl font-light text-[#C9A84C]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-5 font-serif text-2xl font-light text-[#F5F0E8]">
                    {step.title}
                  </h3>
                  <p className="mt-4 font-ui text-sm leading-relaxed text-[#888880]">
                    {step.description}
                  </p>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-18 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <FadeUp delay={0}>
            <SectionLabel
              label={detail.relatedIntro.label}
              title={detail.relatedIntro.title}
              className="max-w-4xl"
            />
          </FadeUp>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedServices.map((item) => (
              <FadeUp key={item.slug} delay={0}>
                <ServiceCard service={item} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta
        eyebrow={detail.closing.eyebrow}
        heading={detail.closing.heading}
        supporting={detail.closing.supporting}
        primaryCta={detail.closing.primaryCta}
        secondaryCta={detail.closing.secondaryCta}
      />
    </>
  )
}
