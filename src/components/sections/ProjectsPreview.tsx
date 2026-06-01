"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import GoldButton from "@/components/ui/GoldButton"
import ProjectPreviewCard from "@/components/ui/ProjectPreviewCard"
import {
  homepageFeaturedProjects,
  projectCategories,
  projectSectionIntro,
} from "@/lib/data/projects"
import { site } from "@/lib/site-content"

export default function ProjectsPreview() {
  const content = site.home.projectsPreview

  return (
    <section
      id="projects"
      className="relative overflow-hidden px-5 py-20 lg:px-16 lg:py-28"
      aria-labelledby="projects-teaser-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-16 size-72 rounded-full bg-[#C9A84C]/[0.03] blur-3xl animate-float-orb" />
        <div className="absolute bottom-0 right-0 size-80 rounded-full bg-[#C9A84C]/[0.025] blur-3xl animate-float-orb-reverse" />
        <div className="absolute inset-x-20 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 animate-fade-up-reveal lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <div className="inline-flex flex-col">
              <p className="font-ui text-[11px] uppercase tracking-[0.38em] text-[#C9A84C]">
                {projectSectionIntro.label}
              </p>
              <span className="mt-4 h-px w-24 origin-left bg-gradient-to-r from-[#C9A84C] to-transparent" />
            </div>

            <h2
              id="projects-teaser-heading"
              className="mt-8 max-w-3xl font-serif text-[clamp(38px,5vw,68px)] font-light leading-[1.02] text-[#F5F0E8]"
            >
              {projectSectionIntro.title}
            </h2>
          </div>

          <p className="max-w-xl font-ui text-[15px] leading-[1.9] text-[#888880] sm:text-[17px]">
            {projectSectionIntro.supporting}
          </p>
        </div>

        <ul
          className="mt-10 flex flex-wrap items-center gap-2 animate-fade-up-reveal sm:gap-3"
          aria-label="Project categories"
        >
          {projectCategories.map((category) => (
            <li key={category}>
              <Link
                href="/projects"
                className="inline-flex min-h-9 items-center rounded-full border border-[#C9A84C]/18 bg-[#131313] px-4 py-1.5 font-ui text-[10px] uppercase tracking-[0.28em] text-[#888880] transition-all duration-[700ms] ease-[cubic-bezier(0.22,0.08,0.2,1)] hover:border-[#C9A84C]/60 hover:text-[#F5F0E8]"
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {homepageFeaturedProjects.map((project, index) => (
            <ProjectPreviewCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start gap-6 border-t border-[#C9A84C]/12 pt-10 animate-fade-up-reveal sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl font-ui text-[14px] leading-[1.85] text-[#888880] sm:text-[15px]">
            {content.footerText}
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <GoldButton href={content.primaryCta.href}>{content.primaryCta.label}</GoldButton>
            <Link
              href={content.secondaryCta.href}
              className="group inline-flex min-h-11 items-center gap-2 font-ui text-xs uppercase tracking-[0.26em] text-[#C9A84C] transition-colors duration-[700ms] hover:text-[#F5F0E8]"
            >
              {content.secondaryCta.label}
              <ArrowRight className="size-4 transition-transform duration-[700ms] ease-[cubic-bezier(0.22,0.08,0.2,1)] group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
