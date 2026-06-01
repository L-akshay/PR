"use client"

import { motion } from "framer-motion"
import {
  AlertTriangle,
  BarChart2,
  Globe,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react"

import FadeUp from "@/components/ui/FadeUp"
import SectionLabel from "@/components/ui/SectionLabel"
import { site } from "@/lib/site-content"

const iconMap = {
  alert: AlertTriangle,
  barChart: BarChart2,
  globe: Globe,
  shield: Shield,
  trending: TrendingUp,
  users: Users,
}

type CardContent = (typeof site.home.whySubscribe.cards)[number]

function Card({ card, index }: { card: CardContent; index: number }) {
  const Icon = iconMap[card.icon as keyof typeof iconMap] ?? Shield

  return (
    <motion.article
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.09,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group relative flex flex-col gap-6 overflow-hidden border-b border-r border-[#2a2a2a] bg-transparent p-8 transition-colors duration-700 hover:bg-[#161616]"
    >
      <div className="absolute left-0 top-0 h-[1.5px] w-0 bg-gradient-to-r from-[#C9A84C] to-transparent transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:w-full" />

      <div className="flex items-start justify-between">
        <span className="font-serif text-[40px] font-light leading-none text-[#C9A84C]/15 transition-colors duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:text-[#C9A84C]/30">
          {card.id}
        </span>
        <div className="flex size-10 items-center justify-center rounded-full border border-[#2a2a2a] bg-transparent text-[#C9A84C]/60 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:border-[#C9A84C]/30 group-hover:text-[#C9A84C]">
          <Icon className="size-[15px]" />
        </div>
      </div>

      <div>
        <h3 className="font-serif text-[22px] font-light leading-snug text-[#F5F0E8]">
          {card.title}
        </h3>
        <p className="mt-3 font-sans text-sm leading-relaxed text-[#555550] transition-colors duration-600 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:text-[#888880]">
          {card.description}
        </p>
      </div>

      <div className="mt-auto h-px w-full overflow-hidden bg-transparent">
        <motion.div
          className="h-full origin-left bg-[#C9A84C]/30"
          initial={false}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.3 + index * 0.09,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />
      </div>
    </motion.article>
  )
}

export default function WhySubscribe() {
  const content = site.home.whySubscribe

  return (
    <section className="bg-[#0f0f0f] px-5 py-20 md:py-24 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <FadeUp delay={0}>
          <SectionLabel
            label={content.label}
            title={content.title}
            description={content.description}
            align="center"
            className="mx-auto max-w-3xl"
          />
        </FadeUp>

        <div className="mt-16 grid grid-cols-1 border-l border-t border-[#2a2a2a] md:grid-cols-2 lg:grid-cols-3">
          {content.cards.map((card, index) => (
            <Card key={card.id} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
