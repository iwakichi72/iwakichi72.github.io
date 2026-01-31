import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Career from "@/components/Career";
import Strengths from "@/components/Strengths";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Career />
        <Strengths />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
