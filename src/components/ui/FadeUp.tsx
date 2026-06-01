"use client"

import * as React from "react"

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
  return (
    <div
      className={cn("animate-fade-up-reveal", className)}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}
