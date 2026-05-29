"use client"

import * as React from "react"
import { useTina } from "tinacms/dist/react"

type TinaContentProviderProps = {
  children: React.ReactNode
  tinaProps?: {
    query: string
    variables: Record<string, unknown>
    data: Record<string, unknown>
  } | null
}

export default function TinaContentProvider({
  children,
  tinaProps,
}: TinaContentProviderProps) {
  useTina(
    tinaProps ?? {
      query: "",
      variables: {},
      data: {},
    }
  )

  return <>{children}</>
}
