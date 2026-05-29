import Portfolio from "@/components/sections/Portfolio"
import PageHero from "@/components/ui/PageHero"
import { featuredCaseStudy } from "@/lib/data/portfolio"
import { site } from "@/lib/site-content"

export default function CaseStudiesPage() {
  const hero = site.pageHeroes.caseStudies

  return (
    <>
      <PageHero
        title={hero.title}
        description={featuredCaseStudy.title}
        image={featuredCaseStudy.image}
      />
      <Portfolio />
    </>
  )
}
