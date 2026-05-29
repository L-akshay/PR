import { data } from "@/lib/site-content"

export type PortfolioCategory = (typeof data.portfolioItems)[number]["category"]
export type PortfolioResult = (typeof data.portfolioItems)[number]["results"][number]
export type PortfolioItem = (typeof data.portfolioItems)[number]

export const portfolioItems = data.portfolioItems
export const featuredCaseStudy = data.featuredCaseStudy
