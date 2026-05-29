import Image from "next/image"
import Link from "next/link"

import type { Service } from "@/lib/data/services"
import { site } from "@/lib/site-content"

type ServiceCardProps = {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const ctaLabel = site.servicesPage.serviceCtaLabel

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[30px] border border-[#C9A84C]/15 bg-[#161616]">
      <div className="relative overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          width={720}
          height={540}
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,15,15,0.7)_0%,rgba(15,15,15,0.1)_55%,rgba(15,15,15,0)_100%)]" />
        <div className="absolute left-5 top-5 rounded-full border border-[#C9A84C]/20 bg-[rgba(15,15,15,0.72)] px-4 py-2 backdrop-blur">
          <span className="font-ui text-[11px] uppercase tracking-[0.24em] text-[#C9A84C]">
            {service.shortLabel}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-8">
        <p className="font-ui text-[11px] uppercase tracking-[0.28em] text-[#C9A84C]">
          {service.eyebrow}
        </p>
        <h3 className="mt-4 font-serif text-3xl font-light leading-[1.04] text-[#F5F0E8]">
          {service.title}
        </h3>
        <p className="mt-4 flex-1 font-ui text-sm leading-relaxed text-[#888880]">
          {service.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {service.keywords.slice(0, 3).map((keyword) => (
            <span
              key={keyword}
              className="rounded-full border border-[#C9A84C]/20 px-3 py-2 font-ui text-[11px] uppercase tracking-[0.22em] text-[#C9A84C]"
            >
              {keyword}
            </span>
          ))}
        </div>

        <Link
          href={`/services/${service.slug}`}
          className="mt-7 inline-flex min-h-11 items-center font-ui text-[11px] uppercase tracking-[0.26em] text-[#C9A84C] transition-colors duration-700 hover:text-[#F5F0E8]"
        >
          {ctaLabel} -&gt;
        </Link>
      </div>
    </article>
  )
}
