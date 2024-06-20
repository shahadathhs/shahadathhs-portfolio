import About from '@/components/About';
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
        <h2>Education</h2>
      </section>
      <section id="contact">
        <h2>Contact</h2>
      </section>
    </main>
  );
}