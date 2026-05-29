"use client"

import ClosingCta from "@/components/ui/ClosingCta"
import { projectsClosingCta } from "@/lib/data/projects"

export default function ProjectsClosing() {
  return (
    <ClosingCta
      eyebrow={projectsClosingCta.label}
      heading={projectsClosingCta.heading}
      supporting={projectsClosingCta.supporting}
      primaryCta={{ href: "/contact", label: projectsClosingCta.button }}
    />
  )
}
