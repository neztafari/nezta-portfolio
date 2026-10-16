import Effects from "@/components/Effects";
import Nav from "@/components/Nav";
import Contact from "@/components/sections/Contact";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import Journey from "@/components/sections/Journey";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";

export default function Home() {
  return (
    <>
      <div className="backdrop" aria-hidden="true" />
      <Effects />
      <Nav />
      <main>
        <Intro />
        <Hero />
        <Journey />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
    </>
  );
}
