import { services } from "@/lib/data/services"
import { site } from "@/lib/site-content"

export const navigationLinks = site.navigation.links

export const serviceNavigationLinks = services.map((service) => ({
  label: service.shortLabel,
  href: `/services/${service.slug}`,
}))

export const footerQuickLinks = site.navigation.links.map(({ label, href }) => ({
  label,
  href,
}))
