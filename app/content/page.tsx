import About from '@/components/About';
import { Contact } from '@/components/Contact';
import { Education } from '@/components/Education';
import Intro from '@/components/Intro';
import { Projects } from '@/components/Projects';
import { SendMail } from '@/components/SendMail';
import Skills from '@/components/Skills';
import { Footer } from '@/components/Footer';

export default function ContentLayoutPage() {

  return (
    <main className='bg-slate-950 overflow-x-hidden'>
      <section id="home">
        <Intro />
      </section>
      <section id="aboutMe">
        <About />
      </section>
      <section id="skills">
        <Skills/>
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="education">
        <Education />
      </section>
      <section id="contact">
        <Contact />
        <SendMail />
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
}