import type { Metadata } from "next";
import { Inter, Calistoga, Geist, Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import { Header } from "@/sections/Header";
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
});
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
});
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-great-vibes",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tadiyos-dejene.vercel.app"),
  title: "Tadiyos Dejene | Full-Stack Developer",
  description:
    "A passionate full-stack developer specializing in React.js, MERN stack, and mobile app development with React Native. Let’s build the future together!",
  openGraph: {
    title: "Tadiyos Dejene | Full-Stack Developer",
    description:
      "A full-stack developer specializing in React.js, MERN stack, and mobile app development.",
    url: "https://tadiyos-dejene.vercel.app",
    siteName: "Tadiyos Dejene Portfolio",
    images: [
      {
        url: "https://tadiyos-dejene.vercel.app/images/og-new.png",
        width: 1200,
        height: 630,
        alt: "Tadiyos Dejene Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tadiyos Dejene | Full-Stack Developer",
    description:
      "A passionate full-stack developer with expertise in React.js and mobile app development.",
    images: ["https://tadiyos-dejene.vercel.app/images/og-new.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://tadiyos-dejene.vercel.app/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Tadiyos Dejene",
              jobTitle: "Full-Stack Developer",
              url: "https://tadiyos-dejene.vercel.app/",
              sameAs: [
                "https://linkedin.com/in/tadiyosdejene",
                "https://github.com/TadiyosDejene",
              ],
            }),
          }}
        />
      </head>
      <body
        className={twMerge(
          inter.variable,
          calistoga.variable,
          geist.variable,
          playfair.variable,
          greatVibes.variable,
          "bg-gray-950 text-white antialiased font-sans"
        )}
      >
        <NextTopLoader />
        <Header />
        {children}
      </body>
    </html>
  );
}
