"use client";
import Navbar from "./_components/landing/Navbar";
import Hero from "./_components/landing/Hero";
import Features from "./_components/landing/Features";
import DashboardPreview from "./_components/landing/DashboardPreview";
import Footer from "./_components/landing/Footer";

export default function Home() {
  return (
    <div className="selection:bg-primary min-h-screen bg-white font-sans text-black selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <DashboardPreview />
      </main>
      <Footer />
    </div>
  );
}
