import { Plus_Jakarta_Sans, Space_Grotesk, Caveat } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
  weight: ["600", "700"],
});

export const metadata = {
  metadataBase: new URL("https://beyondsky.intheblackmedia.com"),
  title: "Beyond Sky | Stories From the Skies - Aviation Documentaries & Podcast",
  description: "Explore the fascinating world of aviation with Beyond Sky. Deep-dive documentaries, aerospace history, aircraft engineering, and industry analysis with over 15M+ views.",
  keywords: [
    "Beyond Sky",
    "Aviation",
    "Airplane Documentaries",
    "Boeing vs Airbus",
    "Stories from the Skies",
    "Aviation Podcast",
    "Aircraft Engineering",
    "In The Black Media"
  ],
  authors: [{ name: "Beyond Sky & In The Black Media" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Beyond Sky | Stories From the Skies",
    description: "Engaging aviation narratives, curious historical facts, and aerospace engineering analysis. 39.3K+ Subscribers & 15M+ Views.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Beyond Sky - Stories From the Skies",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beyond Sky | Stories From the Skies",
    description: "Engaging narratives and beautiful presentations making complex aviation subjects accessible and entertaining.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${spaceGrotesk.variable} ${caveat.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              window.scrollTo(0, 0);
            `,
          }}
        />
      </head>
      <body className="theme-dark">
        {/* Background Radar Rings & Grid */}
        <div className="sky-background-grid" aria-hidden="true">
          <div className="sky-radar-ring ring-1"></div>
          <div className="sky-radar-ring ring-2"></div>
          <div className="sky-radar-ring ring-3"></div>
          <div className="sky-altitude-lines"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
