type LegalSection = {
  title: string
  body: string[]
}

type LegalPageProps = {
  title: string
  description: string
  updated: string
  sections: LegalSection[]
}

export default function LegalPage({
  title,
  description,
  updated,
  sections,
}: LegalPageProps) {
  return (
    <section className="px-5 pt-36 pb-20 lg:px-16 lg:pt-44 lg:pb-24">
      <div className="mx-auto max-w-4xl">
        <p className="font-sans text-[11px] uppercase tracking-[0.36em] text-[#C9A84C]">
          Legal
        </p>
        <h1 className="mt-6 font-serif text-[clamp(44px,8vw,96px)] font-light leading-[0.94] text-[#F5F0E8]">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-[#B8B0A2]">
          {description}
        </p>
        <p className="mt-4 font-sans text-xs uppercase tracking-[0.24em] text-[#888880]">
          Last updated: {updated}
        </p>

        <div className="mt-14 space-y-10 border-t border-[#C9A84C]/15 pt-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-serif text-3xl font-light text-[#F5F0E8]">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 font-sans text-[15px] leading-8 text-[#A9A196]">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
