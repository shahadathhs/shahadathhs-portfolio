import About from '@/components/About';

export default function ContentLayoutPage() {

  return (
    <main>
      <section id="aboutMe">
        <About />
      </section>
      <section id="skills">
        <h2>Skills</h2>
      </section>
      <section id="projects">
        <h2>Projects</h2>
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