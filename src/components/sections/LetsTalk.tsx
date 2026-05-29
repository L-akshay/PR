import ClosingCta from "@/components/ui/ClosingCta"
import { site } from "@/lib/site-content"

export default function LetsTalk() {
  const content = site.home.letsTalk

  return (
    <ClosingCta
      eyebrow={content.eyebrow}
      heading={content.heading}
      supporting={content.supporting}
      primaryCta={content.primaryCta}
      secondaryCta={content.secondaryCta}
    />
  )
}
