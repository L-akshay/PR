import { site } from "@/lib/site-content"

type TinaQueryResult = {
  query: string
  variables: Record<string, unknown>
  data: Record<string, unknown>
}

export async function getTinaSiteContent(): Promise<TinaQueryResult | null> {
  if (process.env.TINA_PUBLIC_IS_LOCAL !== "true") {
    return null
  }

  try {
    const { client } = await import("../../tina/__generated__/client")
    const result = await client.queries.siteContent({
      relativePath: "site.json",
    })

    return {
      query: result.query,
      variables: result.variables,
      data: result.data as Record<string, unknown>,
    }
  } catch {
    return {
      query: "",
      variables: {},
      data: { siteContent: site },
    }
  }
}
