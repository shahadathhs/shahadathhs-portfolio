import { HoverEffect } from "./ui/card-hover-effect";

const skills = [
  {
    title: "Front-end Development",
    description: [
      { name: 'HTML', level: 'Advanced' },
      { name: 'CSS', level: 'Intermediate' },
      { name: 'JavaScript', level: 'Intermediate' },
    ],
  },
  {
    title: "Front-end Frameworks",
    description: [
      { name: 'Tailwind CSS', level: 'Intermediate' },
      { name: 'React.js', level: 'Intermediate' },
    ],
  },
  {
    title: "Back-end Development",
    description: [
      { name: 'Node.js', level: 'Beginner' },
      { name: 'Express.js', level: 'Beginner' },
      { name: 'MongoDB', level: 'Beginner' },
    ],
  },
  {
    title: "Development Tools",
    description: [
      { name: 'GitHub', level: 'Intermediate' },
      { name: 'Vercel', level: 'Intermediate' },
      { name: 'Netlify', level: 'Intermediate' },
    ],
  },
  {
    title: "Animation and Effects",
    description: [
      { name: 'AOS', level: 'Intermediate' },
      { name: 'Framer Motion', level: 'Intermediate' },
    ],
  },
  {
    title: "Other Technologies",
    description: [
      { name: 'Firebase', level: 'Beginner' },
      { name: 'JWT', level: 'Beginner' },
      { name: 'Stripe Payment Method', level: 'Beginner' },
    ],
  },
];

export default function Skills() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-20 z-0">
      <HoverEffect items={skills} />
    </div>
  );
}