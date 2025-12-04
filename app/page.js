"use client";
import Navbar from "./_components/landing/Navbar";
import Hero from "./_components/landing/Hero";
import Features from "./_components/landing/Features";
import UseCases from "./_components/landing/UseCases";
import DashboardPreview from "./_components/landing/DashboardPreview";
import FinalCTA from "./_components/landing/FinalCTA";
import Footer from "./_components/landing/Footer";

export default function Home() {
  return (
    <div className="selection:bg-primary min-h-screen bg-white font-sans text-black selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <UseCases />
        <DashboardPreview />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
