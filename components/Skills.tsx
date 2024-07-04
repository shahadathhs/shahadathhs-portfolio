import { HoverEffect } from "./ui/card-hover-effect";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGithub } from "react-icons/fa";
import { SiTailwindcss, SiExpress, SiMongodb, SiVercel } from "react-icons/si";

const skills = [
  {
    title: "Front-end",
    description: [
      { name: 'HTML', level: 'Advanced', icon: <FaHtml5 /> },
      { name: 'CSS', level: 'Intermediate', icon: <FaCss3Alt /> },
      { name: 'JavaScript', level: 'Intermediate', icon: <FaJs /> },
      { name: 'Tailwind CSS', level: 'Intermediate', icon: <SiTailwindcss /> },
      { name: 'React.js', level: 'Intermediate', icon: <FaReact /> },
    ],
  },
  {
    title: "Back-end & Tools",
    description: [
      { name: 'Node.js', level: 'Beginner', icon: <FaNodeJs /> },
      { name: 'Express.js', level: 'Beginner', icon: <SiExpress /> },
      { name: 'MongoDB', level: 'Beginner', icon: <SiMongodb /> },
      { name: 'GitHub', level: 'Intermediate', icon: <FaGithub /> },
      { name: 'Vercel', level: 'Intermediate', icon: <SiVercel /> },
    ],
  }
];

export default function Skills() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-20 z-0">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">Technology Skills</h1>
        <p className="text-lg text-gray-400 max-w-lg mx-auto">
          Below is an overview of my proficiency in various front-end and back-end technologies, along with the tools I frequently use.
        </p>
      </div>
      <HoverEffect items={skills} />
    </div>
  );
}
