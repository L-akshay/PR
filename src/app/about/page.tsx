"use client"

import * as React from "react"
import Image from "next/image"
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  type Variants,
} from "framer-motion"
import {
  ArrowDown,
  Gem,
  Globe2,
  Handshake,
  Lightbulb,
  type LucideIcon,
} from "lucide-react"

import ClosingCta from "@/components/ui/ClosingCta"
import { timeline } from "@/lib/data/timeline"
import { site } from "@/lib/site-content"

const EASE = [0.25, 0.1, 0.25, 1] as const

const valueIcons: Record<string, LucideIcon> = {
  gem: Gem,
  globe: Globe2,
  handshake: Handshake,
  lightbulb: Lightbulb,
}

function usePrefersReducedMotion() {
  return React.useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
      mq.addEventListener("change", onStoreChange)
      return () => mq.removeEventListener("change", onStoreChange)
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  )
}

function RevealUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const reduced = usePrefersReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, y: 32 }}
      animate={
        reduced
          ? { opacity: 1, y: 0 }
          : isInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 32 }
      }
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

function CountUp({
  value,
  suffix = "",
  delay = 0,
  className,
}: {
  value: number
  suffix?: string
  delay?: number
  className?: string
}) {
  const ref = React.useRef<HTMLSpanElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const motionValue = useMotionValue(0)
  const [display, setDisplay] = React.useState(0)
  const reduced = usePrefersReducedMotion()

  React.useEffect(() => {
    const unsub = motionValue.on("change", (latest) => {
      setDisplay(Math.round(latest))
    })
    return unsub
  }, [motionValue])

  React.useEffect(() => {
    if (reduced || !isInView) return
    const controls = animate(motionValue, value, {
      duration: 1.6,
      delay,
      ease: "easeOut",
    })
    return () => controls.stop()
  }, [delay, isInView, motionValue, reduced, value])

  return (
    <span ref={ref} className={className}>
      {reduced ? value : display}
      {suffix}
    </span>
  )
}

function AboutHero() {
  const reduced = usePrefersReducedMotion()
  const hero = site.about.hero

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pt-36 pb-20 lg:px-16 lg:pt-44">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.14)_0%,rgba(201,168,76,0.04)_28%,rgba(15,15,15,0.22)_58%,rgba(15,15,15,0.92)_100%)]" />
        <motion.div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)",
            backgroundSize: "96px 96px",
          }}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 0.06 }}
          transition={{ duration: 1.4, ease: EASE }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.22)_0%,rgba(201,168,76,0)_70%)]"
          initial={reduced ? false : { opacity: 0, scale: 0.9 }}
          animate={
            reduced
              ? { opacity: 1, scale: 1 }
              : { opacity: [0.6, 1, 0.6], scale: [0.96, 1.04, 0.96] }
          }
          transition={
            reduced
              ? { duration: 0 }
              : {
                  duration: 7,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                }
          }
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <motion.p
          className="font-sans text-[11px] uppercase tracking-[0.42em] text-[#C9A84C]"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          className="mt-10 font-serif text-[clamp(44px,9vw,132px)] leading-[0.92] text-[#F5F0E8]"
          initial={reduced ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        >
          <span className="block font-light">{hero.headingLineOne}</span>
          <span className="mt-2 block font-light italic text-[#C9A84C]">
            {hero.headingLineTwo}
          </span>
        </motion.h1>

        <motion.div
          className="mt-12 h-px w-full max-w-xl origin-center bg-[#C9A84C]"
          initial={reduced ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
        />

        <motion.p
          className="mt-10 max-w-2xl font-sans text-base leading-relaxed text-[#888880] sm:text-lg"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
        >
          {hero.description}
        </motion.p>
      </div>

      <motion.div
        aria-hidden
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-[#C9A84C]"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 1.1 }}
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.42em] text-[#888880]">
          {hero.scrollLabel}
        </span>
        <motion.span
          className="inline-flex"
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={
            reduced
              ? undefined
              : {
                  duration: 1.8,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                }
          }
        >
          <ArrowDown className="size-5" strokeWidth={1.2} />
        </motion.span>
      </motion.div>
    </section>
  )
}

function WordReveal({
  text,
  className,
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const reduced = usePrefersReducedMotion()
  const words = text.split(" ")

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.045,
        delayChildren: delay,
      },
    },
  }

  const word: Variants = {
    hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={isInView || reduced ? "visible" : "hidden"}
    >
      {words.map((w, index) => (
        <motion.span
          key={`${w}-${index}`}
          variants={word}
          className="inline-block"
        >
          {w}
          {index < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.div>
  )
}

function MissionSection() {
  const reduced = usePrefersReducedMotion()
  const imageRef = React.useRef<HTMLDivElement | null>(null)
  const imageInView = useInView(imageRef, { once: true, margin: "-80px" })
  const mission = site.about.mission

  return (
    <section className="relative px-5 py-24 lg:px-16 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.4fr_1fr] lg:gap-20">
        <div className="relative">
          <span
            aria-hidden
            className="font-serif text-[clamp(140px,22vw,260px)] font-light leading-[0.8] text-[#C9A84C]/10 select-none"
          >
            &ldquo;
          </span>
          <RevealUp delay={0.1} className="mt-4 lg:mt-10">
            <p className="font-sans text-[11px] uppercase tracking-[0.36em] text-[#C9A84C]">
              {mission.label}
            </p>
          </RevealUp>
        </div>

        <div>
          <WordReveal
            text={mission.quote}
            className="font-serif text-[clamp(28px,4.2vw,56px)] font-light italic leading-[1.15] text-[#C9A84C]"
          />

          <RevealUp delay={0.35} className="mt-12 max-w-2xl">
            <p className="font-sans text-base leading-relaxed text-[#888880] sm:text-lg">
              {mission.description}
            </p>
          </RevealUp>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-7xl">
        <div
          ref={imageRef}
          className="relative overflow-hidden rounded-[28px] border border-[#C9A84C]/15"
          style={{ aspectRatio: "21 / 9" }}
        >
          <Image
            src={mission.image}
            alt={mission.imageAlt}
            fill
            sizes="(min-width: 1024px) 1200px, 100vw"
            className="object-cover"
          />

          <motion.div
            className="absolute inset-0 bg-[#C9A84C]"
            style={{ transformOrigin: "right" }}
            initial={reduced ? false : { scaleX: 1 }}
            animate={
              reduced || imageInView ? { scaleX: 0 } : { scaleX: 1 }
            }
            transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
          />
        </div>
      </div>
    </section>
  )
}

function StatsBar() {
  const stats = site.about.stats

  return (
    <section className="relative border-y border-[#C9A84C]/30 bg-[#161616] px-5 py-14 lg:px-16 lg:py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-y-0">
        {stats.map((stat, index) => (
          <RevealUp
            key={stat.label}
            delay={index * 0.08}
            className="relative flex flex-col items-center text-center md:px-6"
          >
            {index < stats.length - 1 ? (
              <span
                aria-hidden
                className="pointer-events-none absolute right-0 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-[#C9A84C]/25 md:block"
              />
            ) : null}
            <p className="font-serif text-[clamp(44px,5vw,72px)] font-light leading-none text-[#C9A84C]">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-4 font-sans text-[11px] uppercase tracking-[0.32em] text-[#888880]">
              {stat.label}
            </p>
          </RevealUp>
        ))}
      </div>
    </section>
  )
}

function TimelineSection() {
  const intro = site.about.timelineIntro

  return (
    <section className="relative overflow-hidden bg-[#161616] px-5 py-24 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <RevealUp>
          <p className="font-sans text-[11px] uppercase tracking-[0.36em] text-[#C9A84C]">
            {intro.label}
          </p>
        </RevealUp>
        <RevealUp delay={0.1} className="mt-5 max-w-3xl">
          <h2 className="font-serif text-[clamp(32px,4.8vw,60px)] font-light leading-[0.98] text-[#F5F0E8]">
            {intro.titlePrefix}{" "}
            <span className="italic text-[#C9A84C]">{intro.titleAccent}</span>{" "}
            {intro.titleSuffix}
          </h2>
        </RevealUp>

        <div className="mt-16 lg:hidden">
          <div className="relative space-y-12 pl-8">
            <span
              aria-hidden
              className="absolute left-2 top-2 bottom-2 w-px bg-[#C9A84C]/30"
            />
            {timeline.map((item, index) => (
              <RevealUp
                key={item.year}
                delay={index * 0.08}
                className="relative"
              >
                <span
                  aria-hidden
                  className="absolute -left-[26px] top-3 inline-flex size-3 rounded-full border border-[#C9A84C] bg-[#161616]"
                />
                <p className="font-serif text-4xl font-light text-[#C9A84C]">
                  {item.year}
                </p>
                <h3 className="mt-3 font-serif text-2xl font-light text-[#F5F0E8]">
                  {item.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-[#888880]">
                  {item.description}
                </p>
              </RevealUp>
            ))}
          </div>
        </div>

        <div className="relative mt-16 hidden lg:block">
          <div
            className="-mx-5 overflow-x-auto overflow-y-hidden pb-6 lg:-mx-16"
            style={{ scrollbarWidth: "thin" }}
          >
            <div className="relative min-w-max px-5 lg:px-16">
              <span
                aria-hidden
                className="pointer-events-none absolute left-0 right-0 top-[54px] h-px bg-[#C9A84C]/30"
              />
              <div className="flex items-start gap-10">
                {timeline.map((item, index) => (
                  <RevealUp
                    key={item.year}
                    delay={index * 0.08}
                    className="relative w-[320px] shrink-0"
                  >
                    <p className="font-serif text-5xl font-light leading-none text-[#C9A84C]">
                      {item.year}
                    </p>
                    <span
                      aria-hidden
                      className="mt-4 block size-3 rounded-full border border-[#C9A84C] bg-[#161616]"
                    />
                    <h3 className="mt-6 font-serif text-2xl font-light text-[#F5F0E8]">
                      {item.title}
                    </h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-[#888880]">
                      {item.description}
                    </p>
                  </RevealUp>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ValueRow({
  value,
  index,
}: {
  value: (typeof site.about.values)[number]
  index: number
}) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const reduced = usePrefersReducedMotion()
  const Icon = valueIcons[value.icon] ?? Lightbulb
  const isEven = index % 2 === 0
  const slideFrom = isEven ? -60 : 60

  return (
    <motion.article
      ref={ref}
      className="group relative py-14 lg:py-20"
      initial={reduced ? false : { opacity: 0, x: slideFrom }}
      animate={
        reduced
          ? { opacity: 1, x: 0 }
          : isInView
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: slideFrom }
      }
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div
        className={`mx-auto flex max-w-5xl flex-col gap-6 lg:max-w-6xl ${
          isEven ? "lg:items-start lg:text-left" : "lg:items-end lg:text-right"
        }`}
      >
        <span
          aria-hidden
          className="font-serif text-[clamp(80px,11vw,160px)] font-light leading-[0.85] text-[#C9A84C]/10 select-none"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div
          className={`flex items-center gap-4 ${
            isEven ? "" : "lg:flex-row-reverse"
          }`}
        >
          <Icon className="size-7 text-[#C9A84C]" strokeWidth={1.2} />
          <div className="relative inline-block">
            <h3 className="font-serif text-[clamp(36px,5vw,64px)] font-light leading-[0.95] text-[#F5F0E8]">
              {value.title}
            </h3>
            <span
              aria-hidden
              className={`absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-[#C9A84C] transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-x-100 ${
                isEven ? "origin-left" : "origin-right"
              }`}
            />
          </div>
        </div>
        <p
          className={`max-w-xl font-sans text-base leading-relaxed text-[#888880] sm:text-lg ${
            isEven ? "" : "lg:ml-auto"
          }`}
        >
          {value.description}
        </p>
      </div>
    </motion.article>
  )
}

function ValuesSection() {
  const intro = site.about.valuesIntro
  const values = site.about.values

  return (
    <section className="px-5 py-24 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <RevealUp>
          <p className="font-sans text-[11px] uppercase tracking-[0.36em] text-[#C9A84C]">
            {intro.label}
          </p>
        </RevealUp>
        <RevealUp delay={0.1} className="mt-5 max-w-3xl">
          <h2 className="font-serif text-[clamp(32px,4.8vw,60px)] font-light leading-[0.98] text-[#F5F0E8]">
            {intro.titlePrefix}{" "}
            <span className="italic text-[#C9A84C]">{intro.titleAccent}</span>{" "}
            {intro.titleSuffix}
          </h2>
        </RevealUp>

        <div className="mt-16 divide-y divide-[#C9A84C]/15 border-y border-[#C9A84C]/15">
          {values.map((value, index) => (
            <ValueRow key={value.title} value={value} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function AboutPage() {
  const closing = site.about.closing

  return (
    <>
      <AboutHero />
      <MissionSection />
      <StatsBar />
      <TimelineSection />
      <ValuesSection />
      <ClosingCta
        eyebrow={closing.eyebrow}
        heading={closing.heading}
        supporting={closing.supporting}
        primaryCta={closing.primaryCta}
        secondaryCta={closing.secondaryCta}
      />
    </>
  )
}
