import type { Metadata } from "next";
import { Libre_Baskerville, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CHAMSS COFFEE — Café de quartier à Fès | Torréfié maison depuis 2016",
  description:
    "Chamss Coffee, café à Fès depuis 2016. Espresso torréfié maison, cafés glacés, pâtisseries fraîches du jour. Une adresse conviviale au cœur de la Ville Nouvelle.",
  keywords: [
    "café Fès",
    "Chamss Coffee",
    "coffee shop Maroc",
    "torréfacteur Fès",
    "café glacé Fès",
    "pâtisseries maison",
  ],
  authors: [{ name: "Chamss Coffee" }],
  openGraph: {
    title: "CHAMSS COFFEE — Café de quartier à Fès",
    description:
      "Espresso torréfié maison, cafés glacés et pâtisseries fraîches. Depuis 2016, au cœur de la Ville Nouvelle à Fès.",
    siteName: "Chamss Coffee",
    type: "website",
    locale: "fr_MA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${libreBaskerville.variable} ${cormorantGaramond.variable} ${inter.variable} antialiased bg-cream text-coffee`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
