import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import TrendingQuizzes from "@/components/TrendingQuizzes";
import Info from "@/components/Info";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>  
      <div className="">
        <Navbar />
        <Hero />
        <HowItWorks />
        <TrendingQuizzes />
        <Info />
        {/* <Testimonials /> */}
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
