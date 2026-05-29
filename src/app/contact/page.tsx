import Contact from "@/components/sections/Contact"
import PageHero from "@/components/ui/PageHero"
import { site } from "@/lib/site-content"

export default function ContactPage() {
  const hero = site.pageHeroes.contact

  return (
    <>
      <PageHero
        title={hero.title}
        description={hero.description}
        image={hero.image}
      />
      <Contact />
    </>
  )
}
