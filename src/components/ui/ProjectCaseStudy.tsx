"use client"

import ProjectMetrics from "@/components/ui/ProjectMetrics"
import type { ProjectItem } from "@/lib/data/projects"

type ProjectCaseStudyProps = {
  project: ProjectItem
  index: number
}

export default function ProjectCaseStudy({
  project,
  index,
}: ProjectCaseStudyProps) {
  const isEven = index % 2 === 0

  return (
    <article
      id={project.slug}
      data-category={project.category}
      className="relative scroll-mt-36 animate-fade-up-reveal"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className={`absolute ${
            isEven ? "right-[-6%] top-[-8%]" : "left-[-6%] top-[-8%]"
          } size-80 rounded-full bg-[#C9A84C]/[0.03] blur-3xl animate-float-orb`}
        />
      </div>

      <div className="relative overflow-hidden rounded-[36px] border border-[#C9A84C]/12 bg-[#141414]">
        <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,168,76,0.05)_0%,rgba(201,168,76,0.015)_30%,rgba(15,15,15,0)_65%)]" />

        <div className="relative grid gap-10 p-8 sm:p-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:p-14">
          <div>
            <div className="flex items-baseline gap-6">
              <span className="font-serif text-6xl font-light leading-none text-[#C9A84C]/50 sm:text-7xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-ui text-[11px] uppercase tracking-[0.32em] text-[#C9A84C]">
                {project.category}
              </span>
            </div>

            <h3 className="mt-7 font-serif text-[clamp(32px,3.6vw,52px)] font-light leading-[1.04] text-[#F5F0E8]">
              {project.title}
            </h3>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[18px] border border-[#C9A84C]/10 bg-[#0F0F0F] px-5 py-4">
                <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-[#888880]">
                  Market
                </p>
                <p className="mt-2 font-serif text-xl font-light text-[#F5F0E8]">
                  {project.market}
                </p>
              </div>
              <div className="rounded-[18px] border border-[#C9A84C]/10 bg-[#0F0F0F] px-5 py-4">
                <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-[#888880]">
                  Duration
                </p>
                <p className="mt-2 font-serif text-xl font-light text-[#F5F0E8]">
                  {project.duration}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-ui text-[15px] leading-[1.9] text-[#888880] sm:text-[17px]">
              {project.summary}
            </p>

            <div className="mt-10">
              <p className="font-ui text-[10px] uppercase tracking-[0.32em] text-[#C9A84C]">
                Outcomes
              </p>
              <div className="mt-5 h-px w-16 bg-gradient-to-r from-[#C9A84C] to-transparent" />
            </div>

            <ProjectMetrics outcomes={project.outcomes} className="mt-6" />
          </div>
        </div>
      </div>
    </article>
  )
}
