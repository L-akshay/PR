import Link from "next/link"
import {
  BriefcaseBusiness,
  Camera,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react"

import {
  footerQuickLinks,
  serviceNavigationLinks,
} from "@/constants/navigation"
import { site } from "@/lib/site-content"

const socials = [
  { icon: Camera, href: "#" },
  { icon: Send, href: "#" },
  { icon: BriefcaseBusiness, href: "#" },
  { icon: MessageCircle, href: "#" },
]

export default function Footer() {
  const footer = site.footer
  const navigation = site.navigation

  return (
    <footer className="relative overflow-hidden border-t border-[#C9A84C]/15 bg-[#161616] px-5 pt-16 pb-8 lg:px-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-12 top-8 size-56 rounded-full bg-[#C9A84C]/[0.05] blur-3xl animate-float-orb" />
        <div className="absolute bottom-0 right-0 size-72 rounded-full bg-[#C9A84C]/[0.04] blur-3xl animate-float-orb-reverse" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.25fr_0.9fr_1fr_1fr] lg:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="font-serif text-3xl font-light tracking-[0.01em] text-[#F5F0E8]">
              {navigation.brandPrefix}<span className="text-[#C9A84C]">{navigation.brandAccent}</span>
            </Link>
            <p className="mt-5 max-w-sm font-ui text-[15px] leading-[1.9] text-[#888880]">
              {footer.description}
            </p>
            <div className="mt-7 flex gap-3">
              {socials.map((item, index) => {
                const Icon = item.icon
                const href = footer.socials[index]?.href ?? item.href

                return (
                  <Link
                    key={`${href}-${index}`}
                    href={href}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-[#2A2A2A] text-[#888880] transition-all duration-700 hover:-translate-y-1 hover:border-[#C9A84C] hover:bg-[#0F0F0F] hover:text-[#C9A84C]"
                  >
                    <Icon className="size-4" />
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="mb-4 font-ui text-[11px] uppercase tracking-[0.3em] text-[#C9A84C] sm:mb-6">
              {footer.quickLinksHeading}
            </h3>
            <ul className="space-y-1.5 sm:space-y-3">
              {footerQuickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex min-h-8 items-center font-ui text-sm text-[#888880] transition-colors duration-700 hover:text-[#F5F0E8] sm:min-h-11"
                  >
                    <span className="relative">
                      {item.label}
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#C9A84C] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h3 className="mb-4 font-ui text-[11px] uppercase tracking-[0.3em] text-[#C9A84C] sm:mb-6">
              {footer.servicesHeading}
            </h3>
            <ul className="space-y-1.5 sm:space-y-3">
              {serviceNavigationLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex min-h-8 items-center font-ui text-sm text-[#888880] transition-colors duration-700 hover:text-[#F5F0E8] sm:min-h-11"
                  >
                    <span className="relative">
                      {item.label}
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#C9A84C] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h3 className="mb-4 font-ui text-[11px] uppercase tracking-[0.3em] text-[#C9A84C] sm:mb-6">
              {footer.contactHeading}
            </h3>
            <div className="space-y-5 font-ui text-sm text-[#888880]">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#C9A84C]" />
                <span>{footer.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-[#C9A84C]" />
                <span>{footer.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-[#C9A84C]" />
                <span>{footer.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="my-8 h-px w-full bg-[#C9A84C]/15" />

        <div className="flex flex-col gap-4 text-center font-ui text-[11px] uppercase tracking-[0.16em] text-[#888880] md:flex-row md:items-center md:justify-between md:text-left">
          <p>{footer.copyright}</p>
          <p>{footer.legal}</p>
        </div>
      </div>
    </footer>
  )
}
