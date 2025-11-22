import { Wix_Madefor_Text, Geist_Mono } from "next/font/google";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import AuthInit from "@/components/AuthInit";

config.autoAddCss = false;

const wixMadeforText = Wix_Madefor_Text({
  variable: "--font-wix-madefor-text",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LinxBio",
  description: "One Smart Link for Everything",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${wixMadeforText.variable} ${geistMono.variable} antialiased`}
      >
        <AuthInit />
        {children}
      </body>
    </html>
  );
}
