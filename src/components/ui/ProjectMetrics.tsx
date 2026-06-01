"use client"

import { cn } from "@/lib/utils"

type ProjectMetricsProps = {
  outcomes: string[]
  className?: string
}

export default function ProjectMetrics({
  outcomes,
  className,
}: ProjectMetricsProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", className)}>
      {outcomes.map((outcome, index) => (
        <div
          key={outcome}
          style={{ animationDelay: `${0.1 + index * 0.08}s` }}
          className="group relative overflow-hidden rounded-[22px] border border-[#C9A84C]/12 bg-[#121212] px-5 py-5 transition-colors duration-[800ms] ease-[cubic-bezier(0.22,0.08,0.2,1)] animate-fade-up-reveal hover:border-[#C9A84C]/30"
        >
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[800ms] group-hover:opacity-100">
            <div className="absolute -left-10 top-0 h-full w-24 bg-[radial-gradient(ellipse_at_left,rgba(201,168,76,0.14)_0%,rgba(201,168,76,0)_60%)]" />
          </div>

          <div className="relative flex items-start gap-4">
            <span className="mt-2 h-px w-7 shrink-0 bg-[#C9A84C]" />
            <p className="font-ui text-[14px] leading-[1.75] text-[#F5F0E8]/88 sm:text-[15px]">
              {outcome}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
