"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type RevealOnScrollProps = {
  children: React.ReactNode
  delay?: number
  className?: string
}

// CSS-driven reveal so content is never held invisible by client JS in
// production builds. Mirrors FadeUp; animation plays on mount.
export function RevealOnScroll({
  children,
  delay = 0,
  className,
}: RevealOnScrollProps) {
  return (
    <div
      className={cn("animate-fade-up-reveal", className)}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}
