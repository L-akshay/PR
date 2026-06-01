"use client"

import * as React from "react"

import ProjectCaseStudy from "@/components/ui/ProjectCaseStudy"
import ProjectFilter, {
  type ProjectFilterValue,
} from "@/components/ui/ProjectFilter"
import { projectCategories, projectItems } from "@/lib/data/projects"

const FILTER_OPTIONS: ProjectFilterValue[] = ["All", ...projectCategories]

export default function ProjectsCollection() {
  const [active, setActive] = React.useState<ProjectFilterValue>("All")
  const [stuck, setStuck] = React.useState(false)
  const sentinelRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const node = sentinelRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setStuck(!entry.isIntersecting)
      },
      { rootMargin: "-96px 0px 0px 0px", threshold: 1 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const filtered = React.useMemo(
    () =>
      active === "All"
        ? projectItems
        : projectItems.filter((project) => project.category === active),
    [active]
  )

  return (
    <section className="relative px-5 pb-24 lg:px-16 lg:pb-32">
      <div ref={sentinelRef} className="h-px w-full" aria-hidden />

      <div className="sticky top-24 z-30 -mx-5 px-5 lg:-mx-16 lg:px-16">
        <div
          className={`mx-auto max-w-7xl py-4 transition-all duration-[700ms] ease-[cubic-bezier(0.22,0.08,0.2,1)] ${
            stuck
              ? "bg-[#0F0F0F]/92 backdrop-blur-xl shadow-[0_22px_60px_-30px_rgba(15,15,15,0.8)]"
              : "bg-transparent"
          }`}
        >
          <div className="flex items-center gap-5">
            <p className="hidden font-ui text-[10px] uppercase tracking-[0.32em] text-[#C9A84C] lg:inline">
              Index
            </p>
            <ProjectFilter
              value={active}
              options={FILTER_OPTIONS}
              onChange={setActive}
            />
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-12 max-w-7xl">
        <div key={active} className="flex flex-col gap-10 animate-fade-up-reveal lg:gap-14">
          {filtered.map((project, index) => (
            <ProjectCaseStudy
              key={project.id}
              project={project}
              index={index}
            />
          ))}

          {filtered.length === 0 ? (
            <div className="rounded-[28px] border border-[#C9A84C]/12 bg-[#141414] p-10 text-center">
              <p className="font-ui text-[11px] uppercase tracking-[0.3em] text-[#C9A84C]">
                No projects
              </p>
              <p className="mt-4 font-serif text-2xl font-light text-[#F5F0E8]">
                Nothing filed under this category yet.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
