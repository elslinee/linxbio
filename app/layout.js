import {
  Wix_Madefor_Text,
  Geist_Mono,
  Poppins,
  Inter,
  Montserrat,
  Nunito,
  Urbanist,
  Roboto,
  Playfair_Display,
  Mulish,
  Caveat,
  Fjord_One,
  Plus_Jakarta_Sans,
  Saira,
  Barlow,
} from "next/font/google";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import AuthInit from "@/components/AuthInit";
import { AlertDialogProvider } from "@/components/AlertDialogProvider";

config.autoAddCss = false;

const wixMadeforText = Wix_Madefor_Text({
  variable: "--font-wix-madefor-text",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const fjordOne = Fjord_One({
  variable: "--font-fjord-one",
  subsets: ["latin"],
  weight: "400",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "LinxBio",
  description: "One Smart Link for Everything",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${wixMadeforText.variable} ${geistMono.variable} ${poppins.variable} ${inter.variable} ${montserrat.variable} ${nunito.variable} ${urbanist.variable} ${roboto.variable} ${playfairDisplay.variable} ${mulish.variable} ${caveat.variable} ${fjordOne.variable} ${plusJakartaSans.variable} ${saira.variable} ${barlow.variable} antialiased`}
      >
        <AuthInit />
        <AlertDialogProvider>{children}</AlertDialogProvider>
      </body>
    </html>
  );
}
