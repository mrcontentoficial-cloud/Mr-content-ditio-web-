import type { Metadata } from "next";
import { Poppins, Space_Grotesk, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400", "500", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Mister Content. Imaginamos, creamos, transformamos.",
    template: "%s | Mister Content",
  },
  description:
    "Agencia creativa digital. Sitios web, identidad de marca, redes sociales, contenido, automatización de WhatsApp y publicidad digital para emprendedores y pequeñas empresas.",
  keywords: [
    "agencia creativa",
    "marketing digital",
    "sitios web",
    "identidad de marca",
    "redes sociales",
    "automatización WhatsApp",
    "Meta Ads",
  ],
  openGraph: {
    title: "Mister Content. Imaginamos, creamos, transformamos.",
    description:
      "Tu presencia digital o vende o estorba. Nosotros la hacemos vender: web, marca, contenido, WhatsApp y publicidad en un solo lugar.",
    url: SITE.url,
    siteName: SITE.name,
    locale: "es_MX",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Mister Content" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mister Content. Imaginamos, creamos, transformamos.",
    description:
      "Agencia creativa digital: web, marca, contenido y WhatsApp que convierten visitas en clientes.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${poppins.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <head>
        <link href="https://fonts.cdnfonts.com/css/coolvetica" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-night text-white">
        {children}
      </body>
    </html>
  );
}
