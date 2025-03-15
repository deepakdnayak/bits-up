import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import TrendingQuizzes from "@/components/TrendingQuizzes";
import Info from "@/components/Info";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="pt-14">
      <Hero />
      <HowItWorks />
      <TrendingQuizzes />
      <Info />
      {/* <Testimonials /> */}
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
