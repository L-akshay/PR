import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import ClosingCta from "@/components/ui/ClosingCta"
import FadeUp from "@/components/ui/FadeUp"
import PageHero from "@/components/ui/PageHero"
import { blogPosts } from "@/lib/data/blog"
import { site } from "@/lib/site-content"

type BlogPostPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = blogPosts.find((blogPost) => blogPost.slug === slug)

  if (!post) {
    notFound()
  }
  const page = site.blogPage

  return (
    <>
      <PageHero
        title={post.category}
        description={post.title}
        image={post.image}
      />

      <section className="px-5 py-20 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <FadeUp delay={0}>
            <div className="mb-12 flex items-center justify-between">
              <span className="font-sans text-xs uppercase tracking-[0.24em] text-gold">
                {post.readTime}
              </span>
              <Link
                href="/blog"
                className="font-sans text-xs uppercase tracking-[0.24em] text-muted transition-colors duration-300 hover:text-gold"
              >
                {page.backLabel}
              </Link>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="mb-14 overflow-hidden rounded-[28px] border border-gold/15">
              <Image
                src={post.image}
                alt={post.title}
                width={1200}
                height={680}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="prose prose-invert max-w-none">
              {post.content.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="mb-6 font-sans text-base leading-[1.9] text-muted last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </FadeUp>

        </div>
      </section>

      <ClosingCta
        eyebrow={page.closing.eyebrow}
        primaryCta={page.closing.primaryCta}
      />
    </>
  )
}
