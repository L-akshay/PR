"use client"

import FadeUp from "@/components/ui/FadeUp"
import SectionLabel from "@/components/ui/SectionLabel"
import TestimonialCard from "@/components/ui/TestimonialCard"
import { testimonials } from "@/lib/data/testimonials"
import { site } from "@/lib/site-content"

type TestimonialMarqueeRowProps = {
  items: typeof testimonials
  direction: "left" | "right"
  duration: string
}

function TestimonialMarqueeRow({
  items,
  direction,
  duration,
}: TestimonialMarqueeRowProps) {
  const duplicatedItems = [...items, ...items, ...items]

  return (
    <div className="overflow-hidden py-3">
      <div
        className={`flex w-max items-stretch gap-6 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        } hover:[animation-play-state:paused]`}
        style={{ animationDuration: duration }}
      >
        {duplicatedItems.map((testimonial, index) => (
          <div
            key={`${testimonial.name}-${index}`}
            className="w-[min(88vw,30rem)] shrink-0 whitespace-normal md:w-[28rem] lg:w-[30rem]"
          >
            <TestimonialCard testimonial={testimonial} active />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Testimonials() {
  const intro = site.home.testimonialsIntro

  return (
    <section className="relative overflow-hidden bg-[#0F0F0F] px-5 py-18 md:py-24 lg:px-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-12 size-56 rounded-full bg-[#C9A84C]/[0.04] blur-3xl animate-float-orb" />
        <div className="absolute bottom-4 right-0 size-64 rounded-full bg-[#C9A84C]/[0.03] blur-3xl animate-float-orb-reverse" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <FadeUp delay={0}>
          <SectionLabel
            label={intro.label}
            title={intro.title}
            description={intro.description}
            align="center"
            className="max-w-4xl"
          />
        </FadeUp>

        <div className="sr-only">
          <ul>
            {testimonials.map((testimonial) => (
              <li key={testimonial.name}>
                {testimonial.quote} - {testimonial.name}, {testimonial.role}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="relative mt-16 overflow-hidden"
          aria-hidden="true"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          <TestimonialMarqueeRow
            items={testimonials}
            direction="left"
            duration="48s"
          />
        </div>
      </div>
    </section>
  )
}
