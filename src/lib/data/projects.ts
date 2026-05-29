import { data } from "@/lib/site-content"

export type ProjectCategory = (typeof data.projectCategories)[number]
export type ProjectItem = (typeof data.projectItems)[number]

export const projectCategories = data.projectCategories
export const projectSectionIntro = data.projectSectionIntro
export const projectsPageIntro = data.projectsPageIntro
export const projectsClosingCta = data.projectsClosingCta
export const projectItems = data.projectItems
export const homepageFeaturedProjects = data.homepageFeaturedProjectSlugs
  .map((slug) => projectItems.find((project) => project.slug === slug))
  .filter((project): project is ProjectItem => Boolean(project))
