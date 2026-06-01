"use client"

import * as React from "react"
import { useTina } from "tinacms/dist/react"

type TinaProps = {
  query: string
  variables: Record<string, unknown>
  data: Record<string, unknown>
}

type TinaContentProviderProps = {
  children: React.ReactNode
  tinaProps?: TinaProps | null
}

// useTina is only meaningful for Tina visual editing, which needs a real
// query. Calling it with an empty/invalid query (as happens in production
// builds where TINA_PUBLIC_IS_LOCAL is not "true" and tinaProps is null) can
// throw during hydration and break interactivity for the whole app. So only
// mount the bridge when we actually have a Tina query.
function TinaBridge({
  tinaProps,
  children,
}: {
  tinaProps: TinaProps
  children: React.ReactNode
}) {
  useTina(tinaProps)
  return <>{children}</>
}

export default function TinaContentProvider({
  children,
  tinaProps,
}: TinaContentProviderProps) {
  if (!tinaProps || !tinaProps.query) {
    return <>{children}</>
  }

  return <TinaBridge tinaProps={tinaProps}>{children}</TinaBridge>
}
