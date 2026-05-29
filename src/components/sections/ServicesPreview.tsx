"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"

import { RevealOnScroll } from "@/components/ui/RevealOnScroll"
import SectionLabel from "@/components/ui/SectionLabel"
import ServiceTagTicker from "@/components/ui/ServiceTagTicker"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { services } from "@/lib/data/services"
import { site } from "@/lib/site-content"
import { cn } from "@/lib/utils"

export default function ServicesPreview() {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const activeIndexRef = React.useRef(0)
  const wrapperRef = React.useRef<HTMLDivElement | null>(null)
  const frameRef = React.useRef<number | null>(null)
  const activeService = services[activeIndex]
  const content = site.home.servicesPreview

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const desktopQuery = window.matchMedia("(min-width: 1024px)")

    const getSectionMetrics = () => {
      const section = wrapperRef.current
      if (!section) return null

      const rect = section.getBoundingClientRect()
      const sectionTop = window.scrollY + rect.top
      const total = section.offsetHeight - window.innerHeight

      if (total <= 0) return null

      return { sectionTop, total }
    }

    const updateActiveIndex = () => {
      frameRef.current = null

      if (!desktopQuery.matches) return

      const metrics = getSectionMetrics()
      if (!metrics) return

      const { sectionTop, total } = metrics
      const scrolled = Math.min(Math.max(window.scrollY - sectionTop, 0), total)
      const segment = total / services.length || 1
      const next = Math.min(
        services.length - 1,
        Math.floor(scrolled / segment)
      )

      if (next !== activeIndexRef.current || scrolled === 0) {
        activeIndexRef.current = next
        setActiveIndex(next)
      }
    }

    const requestUpdate = () => {
      if (frameRef.current !== null) return
      frameRef.current = window.requestAnimationFrame(updateActiveIndex)
    }

    const handleBreakpointChange = () => {
      if (!desktopQuery.matches) {
        activeIndexRef.current = 0
        setActiveIndex(0)
        return
      }

      requestUpdate()
    }

    handleBreakpointChange()
    updateActiveIndex()

    window.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", requestUpdate)
    desktopQuery.addEventListener("change", handleBreakpointChange)

    return () => {
      window.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", requestUpdate)
      desktopQuery.removeEventListener("change", handleBreakpointChange)

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  const setDesktopService = (index: number) => {
    activeIndexRef.current = index
    setActiveIndex(index)

    if (typeof window === "undefined" || window.innerWidth < 1024) return

    const section = wrapperRef.current
    if (!section) return

    const total = section.offsetHeight - window.innerHeight
    if (total <= 0) return

    const sectionTop = window.scrollY + section.getBoundingClientRect().top
    const segment = total / services.length
    const target = sectionTop + segment * index + 1

    window.scrollTo({ top: target, behavior: "smooth" })
  }

  return (
    <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionLabel
              label={content.label}
              title={content.title}
              description={content.description}
              variant="classic"
              className="max-w-4xl"
            />
            <Link
              href="/services"
              className="inline-flex h-11 items-center font-sans text-xs uppercase tracking-[0.24em] text-gold transition-colors duration-700 hover:text-offwhite"
            >
              {content.viewAllLabel}
            </Link>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <ServiceTagTicker className="mt-10" duration="30s" />
        </RevealOnScroll>

        <div
          ref={wrapperRef}
          data-services-wrapper
          className="relative mt-16 hidden lg:block"
          style={{ height: `${services.length * 100}vh` }}
        >
          <div className="sticky top-0 h-screen">
            <div className="grid h-full items-center gap-16 py-24 lg:grid-cols-[300px_minmax(0,1fr)]">
              <div className="flex flex-col justify-center space-y-6">
                {services.map((service, index) => {
                  const active = activeIndex === index
                  return (
                    <div
                      key={service.slug}
                      className="cursor-pointer"
                      onClick={() => setDesktopService(index)}
                    >
                      <div className="flex items-end gap-4">
                        <span
                          className={cn(
                            "font-serif transition-all duration-500",
                            active
                              ? "text-5xl text-gold"
                              : "text-3xl text-muted/30"
                          )}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="flex-1 pb-1">
                          <p
                            className={cn(
                              "font-sans transition-all duration-500",
                              active
                                ? "text-base tracking-normal text-offwhite"
                                : "text-xs uppercase tracking-[0.24em] text-muted/30"
                            )}
                          >
                            {service.shortLabel}
                          </p>
                          <div className="mt-3 h-px overflow-hidden bg-charcoal-4">
                            {active ? (
                              <motion.div
                                key={service.slug}
                                className="h-full origin-left bg-gold"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{
                                  duration: 0.5,
                                  ease: [0.25, 0.1, 0.25, 1],
                                }}
                              />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}

                <div className="flex gap-2 pt-4">
                  {services.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setDesktopService(i)}
                      className={cn(
                        "h-px transition-all duration-500",
                        i === activeIndex ? "w-8 bg-gold" : "w-3 bg-muted/30"
                      )}
                    />
                  ))}
                </div>

                <p className="font-sans text-xs uppercase tracking-[0.16em] text-muted/40">
                  {content.scrollLabel}
                </p>
              </div>

              <div className="flex h-full items-center py-8">
                <div className="w-full overflow-hidden rounded-[32px] border border-gold/15 bg-charcoal-2">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeService.slug}
                      initial={{ opacity: 0, scale: 1.04, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97, y: -20 }}
                      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                      className="relative min-h-[580px]"
                    >
                      <Image
                        src={activeService.image}
                        alt={activeService.title}
                        fill
                        sizes="60vw"
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,15,15,0.95)_0%,rgba(15,15,15,0.5)_40%,rgba(15,15,15,0.05)_70%)]" />
                      <div className="absolute inset-x-0 bottom-0 p-10">
                        <motion.div
                          key={`${activeService.slug}-content`}
                          initial={{ opacity: 0, y: 24 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.2,
                            ease: [0.25, 0.1, 0.25, 1],
                          }}
                        >
                          <h3 className="font-serif text-5xl font-light text-offwhite">
                            {activeService.shortLabel}
                          </h3>
                          <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-offwhite/80">
                            {activeService.description}
                          </p>
                          <Link
                            href={`/services/${activeService.slug}`}
                            className="mt-7 inline-flex h-11 items-center gap-2 font-sans text-xs uppercase tracking-[0.24em] text-gold transition-colors duration-500 hover:text-offwhite"
                          >
                            {content.exploreLabel}
                          </Link>
                        </motion.div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 lg:hidden">
          <Accordion type="single" collapsible defaultValue={services[0].slug}>
            {services.map((service) => (
              <AccordionItem
                key={service.slug}
                value={service.slug}
                className="!rounded-none border-b border-charcoal-4 px-0 py-0"
              >
                <AccordionTrigger className="!rounded-none !border-0 !bg-transparent px-0 py-5 font-serif text-2xl font-light text-offwhite transition-colors duration-300 data-[state=open]:text-gold hover:no-underline [&>svg]:text-muted">
                  {service.shortLabel}
                </AccordionTrigger>
                <AccordionContent className="px-0 !pt-0 !pb-6">
                  <div className="overflow-hidden rounded-[24px]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={900}
                      height={640}
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                  <p className="mt-5 font-sans text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="mt-6 inline-flex h-11 items-center font-sans text-xs uppercase tracking-[0.24em] text-gold"
                  >
                    {content.exploreLabel}
                  </Link>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
