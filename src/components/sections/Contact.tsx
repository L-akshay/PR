import Link from "next/link"
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  Mail,
  MessageCircle,
  Newspaper,
  Send,
  ShieldCheck,
} from "lucide-react"

import ContactForm from "@/components/ui/ContactForm"
import FadeUp from "@/components/ui/FadeUp"
import GoldButton from "@/components/ui/GoldButton"
import SectionLabel from "@/components/ui/SectionLabel"
import {
  contactConversationTopics,
  contactConversationTopicsIntro,
  contactExpectations,
  contactExpectationsIntro,
  contactOptions,
  otherOptionsIntro,
  contactPageIntro,
  contactReasons,
  contactReasonsIntro,
  contactStrategyConsultation,
} from "@/lib/data/contact"
import { site } from "@/lib/site-content"

const contactOptionIcons = {
  Email: Mail,
  LinkedIn: Send,
  "For Press Enquiries": Newspaper,
} as const

const expectationIcons = [CalendarDays, Mail, MessageCircle, Clock3]

export default function Contact() {
  const contactPage = site.contactPage

  return (
    <section className="relative overflow-hidden px-5 py-18 lg:px-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-12 size-64 rounded-full bg-[#C9A84C]/[0.04] blur-3xl animate-float-orb" />
        <div className="absolute bottom-0 right-0 size-72 rounded-full bg-[#C9A84C]/[0.03] blur-3xl animate-float-orb-reverse" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <FadeUp delay={0}>
          <SectionLabel
            label={contactPageIntro.label}
            title={contactPageIntro.title}
            description={contactPageIntro.description}
            className="max-w-4xl"
          />
        </FadeUp>

        <div className="mt-14 grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
          <FadeUp delay={0.05}>
            <div className="relative overflow-hidden rounded-[36px] border border-[#C9A84C]/15 bg-[#161616] p-8 lg:p-10">
              <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/65 to-transparent" />
              <p className="font-ui text-[11px] uppercase tracking-[0.34em] text-[#C9A84C]">
                {contactStrategyConsultation.label}
              </p>
              <h2 className="mt-6 max-w-3xl font-serif text-4xl font-light leading-[0.98] text-[#F5F0E8] sm:text-5xl">
                {contactStrategyConsultation.title}
              </h2>

              <div className="mt-7 space-y-5">
                {contactStrategyConsultation.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="max-w-3xl font-ui text-[15px] leading-[1.9] text-[#888880] sm:text-[17px]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {contactStrategyConsultation.highlights.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[24px] border border-[#C9A84C]/12 bg-[#111111] p-5 transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1"
                  >
                    <p className="font-serif text-[28px] font-light text-[#F5F0E8]">
                      {item.title}
                    </p>
                    <p className="mt-3 font-ui text-sm leading-relaxed text-[#888880]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <GoldButton href="#strategy-consultation">
                  Request Consultation
                </GoldButton>
                <Link
                  href="mailto:hello@novapr.co"
                  className="group inline-flex min-h-11 items-center gap-3 font-ui text-[11px] uppercase tracking-[0.28em] text-[#C9A84C] transition-colors duration-700 hover:text-[#F5F0E8]"
                >
                  <span>Email NovaPR</span>
                  <span className="h-px w-10 bg-[#C9A84C] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:w-14 group-hover:bg-[#F5F0E8]" />
                </Link>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div
              id="strategy-consultation"
              className="relative overflow-hidden rounded-[36px] border border-[#C9A84C]/15 bg-[#111111] p-8 lg:p-10"
            >
              <div className="pointer-events-none absolute right-[-40px] top-[-30px] size-44 rounded-full bg-[#C9A84C]/[0.06] blur-3xl animate-float-orb" />
              <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/65 to-transparent" />

              <p className="relative font-ui text-[11px] uppercase tracking-[0.34em] text-[#C9A84C]">
                {contactPage.consultationRequest.label}
              </p>
              <h3 className="relative mt-6 max-w-2xl font-serif text-4xl font-light leading-[0.98] text-[#F5F0E8] sm:text-5xl">
                {contactPage.consultationRequest.title}
              </h3>
              <p className="relative mt-6 max-w-2xl font-ui text-[15px] leading-[1.9] text-[#888880] sm:text-[17px]">
                {contactPage.consultationRequest.description}
              </p>

              <div className="relative mt-8">
                <ContactForm
                  namePlaceholder={contactPage.form.namePlaceholder}
                  emailPlaceholder={contactPage.form.emailPlaceholder}
                  phonePlaceholder={contactPage.form.phonePlaceholder}
                  companyPlaceholder={contactPage.form.companyPlaceholder}
                  primarySelectLabel={contactPage.form.primarySelectLabel}
                  primarySelectOptions={contactPage.form.primarySelectOptions}
                  secondarySelectLabel={contactPage.form.secondarySelectLabel}
                  secondarySelectOptions={contactPage.form.secondarySelectOptions}
                  messagePlaceholder={contactPage.form.messagePlaceholder}
                  submitLabel={contactPage.form.submitLabel}
                />
              </div>

              <div className="relative mt-5 flex items-start gap-3 rounded-[24px] border border-[#C9A84C]/12 bg-[#161616] px-5 py-4">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#C9A84C]" />
                <p className="font-ui text-sm leading-relaxed text-[#888880]">
                  {contactPage.consultationRequest.confidentiality}
                </p>
              </div>
            </div>
          </FadeUp>
        </div>

        <div className="mt-24 grid gap-10 xl:grid-cols-[0.92fr_1.08fr] xl:items-center">
          <FadeUp delay={0}>
            <div className="xl:pr-8">
              <SectionLabel
                label={contactExpectationsIntro.label}
                title={contactExpectationsIntro.title}
                description={contactExpectationsIntro.description}
                className="max-w-none xl:max-w-[40rem]"
              />
            </div>
          </FadeUp>

          <div className="grid gap-4 sm:auto-rows-fr sm:grid-cols-2">
            {contactExpectations.map((item, index) => {
              const Icon = expectationIcons[index] ?? Clock3

              return (
                <FadeUp key={item.title} delay={0.04 * (index + 1)}>
                  <article className="group flex h-full flex-col rounded-[28px] border border-[#C9A84C]/12 bg-[#161616] p-6 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1 hover:border-[#C9A84C]/22">
                    <span className="inline-flex size-12 items-center justify-center rounded-full border border-[#C9A84C]/15 bg-[#0F0F0F] text-[#C9A84C] transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105">
                      <Icon className="size-5" />
                    </span>
                    <p className="mt-5 font-ui text-[11px] uppercase tracking-[0.28em] text-[#C9A84C]">
                      {item.title}
                    </p>
                    <h3 className="mt-3 font-serif text-[30px] font-light leading-[1.02] text-[#F5F0E8]">
                      {item.timeframe}
                    </h3>
                    <p className="mt-4 flex-1 font-ui text-sm leading-relaxed text-[#888880]">
                      {item.description}
                    </p>
                  </article>
                </FadeUp>
              )
            })}
          </div>
        </div>

        <div className="mt-24">
          <FadeUp delay={0}>
            <SectionLabel
              label={otherOptionsIntro.label}
              title={otherOptionsIntro.title}
              description={otherOptionsIntro.description}
              className="max-w-4xl"
            />
          </FadeUp>

          <div className="mt-10 grid gap-5 lg:grid-cols-3 lg:items-stretch">
            {contactOptions.map((option, index) => {
              const Icon =
                contactOptionIcons[
                  option.label as keyof typeof contactOptionIcons
                ] ?? Mail

              return (
                <FadeUp key={option.label} delay={Math.min(0.05 * (index + 1), 0.18)}>
                  <Link
                    href={option.href}
                    target={option.external ? "_blank" : undefined}
                    rel={option.external ? "noreferrer" : undefined}
                    className="group relative flex h-full flex-col overflow-hidden rounded-[30px] border border-[#C9A84C]/12 bg-[#161616] p-7 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1 hover:border-[#C9A84C]/24"
                  >
                    <div className="pointer-events-none absolute right-[-24px] top-[-18px] size-28 rounded-full bg-[#C9A84C]/[0.05] blur-3xl transition-transform duration-700 group-hover:scale-125" />
                    <span className="relative inline-flex size-12 items-center justify-center rounded-full border border-[#C9A84C]/15 bg-[#0F0F0F] text-[#C9A84C]">
                      <Icon className="size-5" />
                    </span>
                    <p className="relative mt-6 font-ui text-[11px] uppercase tracking-[0.3em] text-[#C9A84C]">
                      {option.label}
                    </p>
                    <h3 className="relative mt-3 font-serif text-[32px] font-light leading-[1.05] text-[#F5F0E8]">
                      {option.title}
                    </h3>
                    <p className="relative mt-4 flex-1 font-ui text-sm leading-relaxed text-[#888880]">
                      {option.description}
                    </p>

                    <div className="relative mt-8 flex items-center justify-between gap-4 border-t border-[#2A2A2A] pt-5">
                      <span className="font-ui text-sm text-[#F5F0E8]">
                        {option.value}
                      </span>
                      <ArrowUpRight className="size-5 text-[#C9A84C] transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                </FadeUp>
              )
            })}
          </div>
        </div>

        <FadeUp delay={0.08}>
          <div className="mt-24 rounded-[36px] border border-[#C9A84C]/15 bg-[#161616] p-8 lg:p-10">
            <SectionLabel
              label={contactConversationTopicsIntro.label}
              title={contactConversationTopicsIntro.title}
              description={contactConversationTopicsIntro.description}
              className="max-w-4xl"
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {contactConversationTopics.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[28px] border border-[#C9A84C]/12 bg-[#111111] p-6 transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1"
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-full border border-[#C9A84C]/18 bg-[#0F0F0F] text-[#C9A84C]">
                    <Check className="size-4" />
                  </span>
                  <h3 className="mt-5 font-serif text-[30px] font-light leading-[1.04] text-[#F5F0E8]">
                    {item.title}
                  </h3>
                  <p className="mt-4 font-ui text-sm leading-relaxed text-[#888880]">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="mt-24 rounded-[36px] border border-[#C9A84C]/15 bg-[#161616] p-8 lg:p-10">
            <SectionLabel
              label={contactReasonsIntro.label}
              title={contactReasonsIntro.title}
              description={contactReasonsIntro.description}
              className="max-w-4xl"
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {contactReasons.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[28px] border border-[#C9A84C]/12 bg-[#111111] p-6 transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1"
                >
                  <h3 className="font-serif text-[28px] font-light leading-[1.08] text-[#F5F0E8]">
                    {item.title}
                  </h3>
                  <p className="mt-4 font-ui text-sm leading-relaxed text-[#888880]">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <GoldButton href="#strategy-consultation">
                {contactPage.finalCta.label}
              </GoldButton>
              <p className="font-ui text-sm text-[#888880]">
                {contactPage.finalCta.note}
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
