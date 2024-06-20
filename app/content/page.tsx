import About from '@/components/About';
import { Education } from '@/components/Education';
import { Projects } from '@/components/Projects';
import Skills from '@/components/Skills';

export default function ContentLayoutPage() {

  return (
    <main className='bg-slate-950'>
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
        <h2>Contact</h2>
      </section>
    </main>
  );
}