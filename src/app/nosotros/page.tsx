import type { Metadata } from "next";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Contact from "@/components/Contact";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce a Mister Content, la agencia creativa digital que combina estrategia, contenido y tecnología para que tu negocio venda.",
};

export default function NosotrosPage() {
  return (
    <main>
      <ScrollProgress />
      <Navbar />
      <div className="pt-24">
        <About />
      </div>
      <Contact />
      <WhatsAppFloat />
    </main>
  );
}
