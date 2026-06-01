"use client"

import * as React from "react"
import { animate, useMotionValue } from "framer-motion"

type AnimatedStatValueProps = {
  value: number
  suffix?: string
  delay?: number
  duration?: number
  className?: string
}

export default function AnimatedStatValue({
  value,
  suffix = "",
  delay = 0,
  duration = 1.4,
  className,
}: AnimatedStatValueProps) {
  const motionValue = useMotionValue(0)
  // Seed with the real value so it is correct even if the count-up never runs.
  const [display, setDisplay] = React.useState(value)

  React.useEffect(() => {
    const unsubscribe = motionValue.on("change", (latest) => {
      setDisplay(Math.round(latest))
    })

    return unsubscribe
  }, [motionValue])

  React.useEffect(() => {
    const controls = animate(motionValue, value, {
      duration,
      delay,
      ease: "easeOut",
    })

    return () => controls.stop()
  }, [delay, duration, motionValue, value])

  return (
    <span className={className}>
      {display}
      {suffix}
    </span>
  )
}
