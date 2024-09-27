import type { Metadata } from "next";
import { Antic_Didone, DM_Sans } from "next/font/google";
import "./globals.css";

const anticDidone = Antic_Didone({
  weight: "400",
  subsets: ["latin"],
  display: "auto",
});

const dmSans = DM_Sans({
  weight: ["400", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mindful Network - Home",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${anticDidone.className} ${dmSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
