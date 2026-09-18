import type { Metadata } from "next";
import { Libre_Baskerville, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NXRCPLTD');`,
          }}
        />
      </head>
      <body
        className={`${libreBaskerville.variable} ${cormorantGaramond.variable} ${inter.variable} antialiased bg-cream text-coffee`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NXRCPLTD"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
