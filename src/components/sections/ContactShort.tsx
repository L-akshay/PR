import Link from "next/link"

import ContactForm from "@/components/ui/ContactForm"
import FadeUp from "@/components/ui/FadeUp"
import SectionLabel from "@/components/ui/SectionLabel"
import { site } from "@/lib/site-content"

export default function ContactShort() {
  const content = site.home.contactShort

  return (
    <section className="relative overflow-hidden px-5 py-18 lg:px-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-10 size-48 rounded-full bg-[#C9A84C]/[0.04] blur-3xl animate-float-orb" />
        <div className="absolute bottom-0 right-0 size-60 rounded-full bg-[#C9A84C]/[0.03] blur-3xl animate-float-orb-reverse" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <FadeUp delay={0}>
          <SectionLabel
            label={content.label}
            title={content.title}
            description={content.description}
            align="center"
            className="max-w-3xl"
          />
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="relative mt-12 overflow-hidden rounded-[32px] border border-[#C9A84C]/15 bg-[#161616] p-8 shadow-[0_28px_90px_rgba(15,15,15,0.24)] lg:p-10">
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/65 to-transparent" />
            <ContactForm compact />
            <Link
              href={content.cta.href}
              className="group mt-6 inline-flex min-h-11 items-center gap-3 font-ui text-[11px] uppercase tracking-[0.28em] text-[#C9A84C] transition-colors duration-700 hover:text-[#F5F0E8]"
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
