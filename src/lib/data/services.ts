import { data } from "@/lib/site-content"

export type ServiceProcessStep = {
  title: string
  description: string
}

export type ServiceMetric = {
  value: string
  label: string
  detail?: string
}

export type Service = (typeof data.services)[number]

export const serviceTickerTags = data.serviceTickerTags
export const services = data.services
export const allServiceGroups = data.allServiceGroups

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug)
}
