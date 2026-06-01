"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import type { ProjectItem } from "@/lib/data/projects"
import { cn } from "@/lib/utils"

type ProjectPreviewCardProps = {
  project: ProjectItem
  index: number
  href?: string
  className?: string
}

export default function ProjectPreviewCard({
  project,
  index,
  href = "/projects",
  className,
}: ProjectPreviewCardProps) {
  return (
    <div
      className={cn("h-full animate-fade-up-reveal", className)}
      style={{ animationDelay: `${0.1 + index * 0.12}s` }}
    >
      <Link
        href={href}
        className={cn(
          "group relative block h-full overflow-hidden rounded-[30px] border border-[#C9A84C]/12 bg-[#141414] p-7 transition-all duration-[900ms] ease-[cubic-bezier(0.22,0.08,0.2,1)] sm:p-8",
          "hover:-translate-y-1.5 hover:border-[#C9A84C]/45 hover:bg-[#171717]",
          "hover:shadow-[0_30px_80px_-20px_rgba(201,168,76,0.22),0_0_0_1px_rgba(201,168,76,0.12)_inset]",
          "focus-visible:-translate-y-1.5 focus-visible:border-[#C9A84C]/55 focus-visible:outline-none"
        )}
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[1100ms] ease-[cubic-bezier(0.22,0.08,0.2,1)] group-hover:opacity-100">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(201,168,76,0.10)_0%,rgba(201,168,76,0.03)_32%,rgba(15,15,15,0)_65%)]" />
          <div className="absolute -inset-x-12 -top-24 h-56 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.18)_0%,rgba(201,168,76,0)_60%)] animate-project-drift" />
        </div>

        <div className="pointer-events-none absolute inset-x-8 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-[#C9A84C]/70 to-transparent transition-transform duration-[900ms] ease-[cubic-bezier(0.22,0.08,0.2,1)] group-hover:scale-x-100" />

        <div className="relative flex h-full flex-col">
          <div className="flex items-start justify-between gap-6">
            <span className="font-serif text-5xl font-light leading-none text-[#C9A84C]/45 transition-colors duration-[800ms] group-hover:text-[#C9A84C]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="inline-flex size-10 items-center justify-center rounded-full border border-[#C9A84C]/25 text-[#C9A84C] transition-all duration-[800ms] ease-[cubic-bezier(0.22,0.08,0.2,1)] group-hover:border-[#C9A84C] group-hover:bg-[#C9A84C] group-hover:text-[#0F0F0F]">
              <ArrowUpRight className="size-4 transition-transform duration-[800ms] ease-[cubic-bezier(0.22,0.08,0.2,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>

          <p className="mt-8 font-ui text-[10px] uppercase tracking-[0.32em] text-[#C9A84C]">
            {project.category}
          </p>

          <h3 className="mt-5 font-serif text-[28px] font-light leading-[1.08] text-[#F5F0E8] sm:text-[32px]">
            {project.title}
          </h3>

          <p className="mt-5 font-ui text-[11px] uppercase tracking-[0.28em] text-[#888880]">
            {project.market} <span className="mx-2 text-[#C9A84C]/60">·</span>{" "}
            {project.duration}
          </p>

          <div className="mt-auto pt-8">
            <div className="h-px w-full bg-[#C9A84C]/10" />
            <div className="mt-5 flex items-start gap-3">
              <span className="mt-2 h-px w-6 shrink-0 bg-[#C9A84C]" />
              <p className="font-ui text-[14px] leading-[1.7] text-[#F5F0E8]/85 sm:text-[15px]">
                {project.teaserOutcome}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
