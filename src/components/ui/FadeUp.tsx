"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"

import { cn } from "@/lib/utils"

type FadeUpProps = {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function FadeUp({
  children,
  delay = 0,
  className,
}: FadeUpProps) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, {
    once: true,
    margin: "-80px",
  })

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={false}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}
