import Link from "next/link"
import Image from "next/image"

import FadeUp from "@/components/ui/FadeUp"
import PageHero from "@/components/ui/PageHero"
import SectionLabel from "@/components/ui/SectionLabel"
import { blogPosts } from "@/lib/data/blog"
import { site } from "@/lib/site-content"

export default function BlogPage() {
  const hero = site.pageHeroes.blog
  const intro = site.blogPage.intro

  return (
    <>
      <PageHero
        title={hero.title}
        description={hero.description}
        image={hero.image}
      />
      <section className="px-5 py-18 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <FadeUp delay={0}>
            <SectionLabel
              label={intro.label}
              title={intro.title}
              className="max-w-4xl"
            />
          </FadeUp>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {blogPosts.map((post) => (
              <FadeUp key={post.slug} delay={0}>
                <Link href={`/blog/${post.slug}`} className="block">
                  <article className="overflow-hidden rounded-[28px] border border-[#C9A84C]/15 bg-[#161616] transition-colors duration-700 hover:border-[#C9A84C]/30">
                    <div className="overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={1100}
                        height={760}
                        className="h-72 w-full object-cover transition-transform duration-700 hover:scale-[1.06]"
                      />
                    </div>
                    <div className="p-8">
                      <p className="font-sans text-xs uppercase tracking-[0.24em] text-[#C9A84C]">
                        {post.category}
                      </p>
                      <h2 className="mt-4 font-serif text-3xl font-light text-[#F5F0E8]">
                        {post.title}
                      </h2>
                      <p className="mt-4 font-sans text-sm leading-relaxed text-[#888880]">
                        {post.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
