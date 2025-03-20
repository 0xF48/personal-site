import React from "react"
import './globals.css'
import { getData } from "./lib/getData"
import { Footer } from "./components/Footer"

import { GalleryOverlay } from "./components/GalleryOverlay"
import { NavButtonWrapper } from "./lib/NavButtonWrapper"



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const data = await getData()


  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" type="image/png" sizes="32x32" href="/apple-touch-icon.png" />
        <link href="https://fonts.googleapis.com/css2?family=Gloock&family=Outfit:wght@100..900&display=swap" rel="stylesheet"></link>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title >{data.ys_globals.name}</title>
        <meta name="description" content={data.ys_globals.subtitle} />
      </head>

      <body className="bg-main-700 text-white w-full h-fit min-h-screen justify-between flex flex-col">
        <NavButtonWrapper />

        <div className="w-full mx-auto max-w-6xl min-h-[70vh] border-main-600 border-dashed md:border-l-1 md:border-r-1">
          {children}
        </div>
        <Footer />
        {/* <ScrollToTop /> */}
      </body >
    </html >
  )
}
