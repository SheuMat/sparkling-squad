import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sparklingsquad.com"),
  title: {
    default: `${site.name} | Professional Cleaning in ${site.city}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Sparkling Squad is Sheffield's professional cleaning service — domestic, deep & end-of-tenancy cleans, pressure washing, disinfectant fogging, carpets, commercial & gardening. Book online in minutes.",
  keywords: [
    "cleaning Sheffield",
    "end of tenancy cleaning Sheffield",
    "pressure washing Sheffield",
    "domestic cleaners Sheffield",
    "office cleaning Sheffield",
  ],
  openGraph: {
    title: `${site.name} | Professional Cleaning in ${site.city}`,
    description:
      "Domestic, deep & end-of-tenancy cleans, pressure washing, fogging, carpets & more across Sheffield. Book online in minutes.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
