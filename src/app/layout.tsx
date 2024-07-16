import "./globals.css";
import { DM_Sans } from "next/font/google";

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LenisScroll from "@/components/LenisScroll";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="body bg-[#070815] text-white">
        <LenisScroll>
          <Header />
          <main className="min-h-[70svh] md:min-h-[77svh]">{children}</main>
          <Footer />
        </LenisScroll>
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
