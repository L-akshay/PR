import { data } from "@/lib/site-content"

export type Testimonial = (typeof data.testimonials)[number]

export const testimonials = data.testimonials
