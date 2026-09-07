import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yu-Cheng Chien | AI & Backend Engineer",
  description: "Portfolio of Yu-Cheng Chien — AI, backend systems, HealthTech and experimental products.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
