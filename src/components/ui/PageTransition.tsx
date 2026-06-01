"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

type PageTransitionProps = {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  React.useEffect(() => {
    if (pathname !== "/") {
      return
    }

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    })
  }, [pathname])

  // CSS-driven fade so content is never held invisible by client JS.
  // Keyed by pathname so the animation replays on navigation.
  return (
    <div key={pathname} className="min-h-full animate-page-fade-in">
      {children}
    </div>
  )
}
