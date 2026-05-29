import ServicesSection from "@/components/sections/Services"
import ClosingCta from "@/components/ui/ClosingCta"
import PageHero from "@/components/ui/PageHero"
import { site } from "@/lib/site-content"

export default function ServicesPage() {
  const hero = site.pageHeroes.services
  const closing = site.servicesPage.closing

  return (
    <>
      <PageHero
        title={hero.title}
        description={hero.description}
        image={hero.image}
      />
      <ServicesSection />
      <ClosingCta
        eyebrow={closing.eyebrow}
        heading={closing.heading}
        supporting={closing.supporting}
        primaryCta={closing.primaryCta}
        secondaryCta={closing.secondaryCta}
      />
    </>
  )
}
