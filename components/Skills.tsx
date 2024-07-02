import { HoverEffect } from "./ui/card-hover-effect";

const skills = [
  {
    title: "Front-end",
    description: [
      { name: 'HTML', level: 'Advanced' },
      { name: 'CSS', level: 'Intermediate' },
      { name: 'JavaScript', level: 'Intermediate' },
      { name: 'Tailwind CSS', level: 'Intermediate' },
      { name: 'React.js', level: 'Intermediate' },
    ],
  },
  {
    title: "Back-end & Tools",
    description: [
      { name: 'Node.js', level: 'Beginner' },
      { name: 'Express.js', level: 'Beginner' },
      { name: 'MongoDB', level: 'Beginner' },
      { name: 'GitHub', level: 'Intermediate' },
      { name: 'Vercel', level: 'Intermediate' },
      
    ],
  }
];

export default function Skills() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-20 z-0">
      <HoverEffect items={skills} />
    </div>
  );
}