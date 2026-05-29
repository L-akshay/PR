import type { Metadata } from "next"
import { Cormorant_Garamond, DM_Sans, Manrope } from "next/font/google"

import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import CustomCursor from "@/components/ui/CustomCursor"
import BackToTop from "@/components/ui/BackToTop"
import ScrollProgressBar from "@/components/ui/ScrollProgressBar"
import PageTransition from "@/components/ui/PageTransition"
import TinaContentProvider from "@/components/providers/TinaContentProvider"
import { getTinaSiteContent } from "@/lib/tina-site"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: {
    default: "NovaPR | Premium PR & Marketing Agency",
    template: "%s | NovaPR",
  },
  description:
    "Strategic PR, social, creative, influencer, and search campaigns for ambitious brands.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const tinaProps = await getTinaSiteContent()

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${dmSans.variable} ${manrope.variable}`}
    >
      <body className="min-h-screen bg-[#0F0F0F] font-sans text-[#F5F0E8] antialiased">
        <TinaContentProvider tinaProps={tinaProps}>
          <ScrollProgressBar />
          <CustomCursor />
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 overflow-x-clip">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </div>
          <BackToTop />
        </TinaContentProvider>
      </body>
    </html>
  )
}
