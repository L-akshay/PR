"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, Menu } from "lucide-react"
import { usePathname } from "next/navigation"

import {
  navigationLinks,
  serviceNavigationLinks,
} from "@/constants/navigation"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { site } from "@/lib/site-content"

const listVariants = {
  closed: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  closed: { opacity: 0, y: 24 },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
}

export default function Navbar() {
  const navigation = site.navigation
  const pathname = usePathname()
  const [scrolled, setScrolled] = React.useState(false)
  const [sheetOpen, setSheetOpen] = React.useState(false)
  const [servicesOpen, setServicesOpen] = React.useState(false)
  const closeTimer = React.useRef<number | null>(null)

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    return () => {
      if (closeTimer.current) {
        window.clearTimeout(closeTimer.current)
      }
    }
  }, [])

  const openServices = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current)
    }
    setServicesOpen(true)
  }

  const closeServices = () => {
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 140)
  }

  return (
    <header
      className={cn(
        "fixed top-0 z-[75] w-full border-b border-transparent transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
        scrolled && "border-[#C9A84C]/15 bg-[#0F0F0F]/92 shadow-[0_18px_60px_rgba(15,15,15,0.32)] backdrop-blur-xl"
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent opacity-70" />
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-5 lg:px-16">
        <Link
          href="/"
          className="font-serif text-3xl font-light tracking-[0.01em] text-[#F5F0E8]"
        >
          {navigation.brandPrefix}<span className="text-[#C9A84C]">{navigation.brandAccent}</span>
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navigationLinks.map((link) => (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={link.hasDropdown ? openServices : undefined}
                onMouseLeave={link.hasDropdown ? closeServices : undefined}
              >
                {link.hasDropdown ? (
                  <>
                    <Link
                      href={link.href}
                      className={cn(
                        "group relative flex min-h-11 items-center gap-2 font-ui text-[11px] uppercase tracking-[0.24em] text-[#888880] transition-colors duration-700 hover:text-[#C9A84C] after:absolute after:bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#C9A84C] after:transition-all after:duration-500 after:ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:after:w-full",
                        pathname.startsWith("/services") && "text-[#C9A84C]"
                      )}
                    >
                      {link.label}
                      <ChevronDown className="size-4" />
                    </Link>

                    <AnimatePresence>
                      {servicesOpen ? (
                        <motion.div
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 12 }}
                          transition={{
                            duration: 0.7,
                            ease: [0.25, 0.1, 0.25, 1],
                          }}
                          className="absolute left-1/2 top-full z-50 w-[360px] -translate-x-1/2 pt-6"
                          onMouseEnter={openServices}
                          onMouseLeave={closeServices}
                        >
                          <div className="rounded-[28px] border border-[#C9A84C]/15 bg-[#161616] p-6 shadow-[0_30px_80px_rgba(15,15,15,0.55)]">
                            <p className="mb-5 font-ui text-[11px] uppercase tracking-[0.28em] text-[#C9A84C]">
                              {navigation.servicesDropdownLabel}
                            </p>
                            <div className="space-y-3">
                              {serviceNavigationLinks.map((service) => (
                                <Link
                                  key={service.href}
                                  href={service.href}
                                  className="block rounded-2xl border border-transparent px-4 py-3 font-ui text-sm text-[#888880] transition-all duration-700 hover:border-[#C9A84C]/15 hover:bg-[#0F0F0F] hover:text-[#F5F0E8]"
                                >
                                  {service.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      "relative font-ui text-[11px] uppercase tracking-[0.24em] text-[#888880] transition-colors duration-700 hover:text-[#C9A84C] after:absolute after:bottom-[-10px] after:left-0 after:h-px after:w-0 after:bg-[#C9A84C] after:transition-all after:duration-500 after:ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:after:w-full",
                      pathname === link.href && "text-[#C9A84C]"
                    )}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Link
            href={navigation.primaryCta.href}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#C9A84C] px-6 py-3 font-ui text-[11px] uppercase tracking-[0.28em] text-[#C9A84C] transition-all duration-700 hover:-translate-y-0.5 hover:bg-[#C9A84C] hover:text-[#0F0F0F] hover:shadow-[0_14px_30px_rgba(201,168,76,0.18)]"
          >
            {navigation.primaryCta.label}
          </Link>
        </div>

        <Button
          variant="ghost"
          size="icon"
          data-nav-toggle
          className="relative z-80 text-[#F5F0E8] hover:bg-[#161616] hover:text-[#C9A84C] lg:hidden"
          aria-label="Open menu"
          aria-expanded={sheetOpen}
          aria-controls="mobile-navigation"
          onClick={() => setSheetOpen(true)}
        >
          <Menu className="size-6" />
        </Button>

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>

          <SheetContent
            side="right"
            showCloseButton={false}
            className="border-l border-[#C9A84C]/20 bg-[#0F0F0F] px-5 pt-28 pb-6 text-[#F5F0E8] data-[side=right]:w-full data-[side=right]:sm:max-w-md"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-7 right-5 z-10 text-[#F5F0E8] hover:bg-[#161616] hover:text-[#C9A84C] lg:hidden"
              aria-label="Close menu"
              onClick={() => setSheetOpen(false)}
            >
              <Menu className="size-6" />
            </Button>

            <SheetHeader className="sr-only px-0">
              <SheetTitle>{navigation.mobileTitle}</SheetTitle>
            </SheetHeader>

            <motion.nav
              id="mobile-navigation"
              className="flex flex-1 flex-col justify-center"
              initial="closed"
              animate={sheetOpen ? "open" : "closed"}
              variants={listVariants}
            >
              <motion.ul className="space-y-3" variants={listVariants}>
                {navigationLinks.map((link) => (
                  <motion.li key={link.label} variants={itemVariants}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-11 items-center font-serif text-3xl font-light text-[#F5F0E8] transition-colors duration-700 hover:text-[#C9A84C]"
                      onClick={() => setSheetOpen(false)}
                    >
                      {link.label}
                    </Link>
                    {link.hasDropdown ? (
                      <div className="mt-2 space-y-2 pl-4">
                        {serviceNavigationLinks.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="block py-2 font-ui text-[11px] uppercase tracking-[0.24em] text-[#888880] transition-colors duration-700 hover:text-[#C9A84C]"
                            onClick={() => setSheetOpen(false)}
                          >
                            {service.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.nav>

            <SheetFooter className="px-0 pb-0">
              <Link
                href={navigation.primaryCta.href}
                className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#C9A84C] px-6 py-4 font-ui text-[11px] uppercase tracking-[0.28em] text-[#0F0F0F]"
                onClick={() => setSheetOpen(false)}
              >
                {navigation.primaryCta.label}
              </Link>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
