"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import donateLifePic from "@/public/donatelife-banner.png";
import roomReadyPic from "@/public/roomready-banner.png";
import craftPic from "@/public/craft-banner.png";
import industryPic from "@/public/industry.png";

export function Projects() {
  const projects = [
    {
      projectName: 'DonateLife',
      projectTheme: 'A complete MERN Stack Blood Donation website.',
      projectImage: donateLifePic,
      liveLink: 'https://donatelife-f661c.firebaseapp.com',
      gitHubClient: 'https://github.com/shahadathhs/donatelife-client',
      gitHubServer: 'https://github.com/shahadathhs/donatelife-server',
      features: [
        'Dashboard with three roles - Donor, Volunteer, Admin ',
        'Donors can make requests for blood donation and delete them.',
        'Volunteers can add blogs, and change donation request status.'
      ],
      technologies: ['HTML', 'CSS', 'Tailwind CSS', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'React Query', 'JWT']
    },
    {
      projectName: 'RoomReady',
      projectTheme: 'A complete MERN Stack Hotel Room Booking website.',
      projectImage: roomReadyPic,
      liveLink: 'https://eleventh-a-roomready.web.app',
      gitHubClient: 'https://github.com/shahadathhs/room-ready-client',
      gitHubServer: 'https://github.com/shahadathhs/room-ready-server',
      features: [
        'A user can make a booking, cancel it, and update the booking date.',
        'A user can add reviews for the rooms he/she booked.',
        'A user can pay his/her booking cost using the Stripe payment system.'
      ],
      technologies: ['HTML', 'CSS', 'Tailwind CSS', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT']
    },
    {
      projectName: 'Crafttopia',
      projectTheme: 'A MERN Stack Craft Store website.',
      projectImage: craftPic,
      liveLink: 'https://tenth-a-craftopia.web.app',
      gitHubClient: 'https://github.com/shahadathhs/craftopia-client',
      gitHubServer: 'https://github.com/shahadathhs/craftopia-server',
      features: [
        'A user can add his/her craft to the store.',
        'A user can delete a craft added by him/her.',
        'A user can update craft details added by him/her.'
      ],
      technologies: ['HTML', 'CSS', 'Tailwind CSS', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB']
    },
    {
      projectName: 'Industrial Plaza',
      projectTheme: 'A simple real state website with firebase authentication.',
      projectImage: industryPic,
      liveLink: 'https://ningth-a-industrial-plaza.web.app',
      gitHub: 'https://github.com/shahadathhs/industrial-plaza',
      features: [
        'A user can create an account.',
        'A user can delete a craft added by him/her.',
        'A user can view property details after login.'
      ],
      technologies: ['HTML', 'CSS', 'Tailwind CSS', 'JavaScript', 'React.js', 'Firebase-Auth']
    },
  ]

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">My Projects</h1>
        <p className="text-lg text-gray-400 max-w-lg mx-auto">
          Here are some of my projects showcasing my skills in both front-end and back-end technologies. Click on the links to view live demos or explore the code on GitHub.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 overflow-x-hidden'>

        {
          projects.map((project, index) =>
            <CardContainer key={index} className="inter-var">
              <CardBody className="relative group/card  hover:shadow-2xl hover:shadow-emerald-500/[0.1] 
            bg-gradient-to-r from-slate-900 to-slate-850 border-white/[0.2]  w-4/5 sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                {/* project name */}
                <CardItem
                  translateZ="50"
                  className="text-3xl font-bold text-white"
                >
                  {project.projectName}
                </CardItem>
                {/* project theme */}
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-sm max-w-sm mt-2 text-neutral-300"
                >
                  {project.projectTheme}
                </CardItem>
                {/* project image */}
                <CardItem
                  translateZ="100"
                  rotateX={20}
                  rotateZ={-10}
                  className="w-full mt-4"
                >
                  <Image
                    src={project.projectImage}
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                </CardItem>
                {/* links (live, gitHub) */}
                <div className="flex justify-between items-center mt-20">
                  {/* live link */}
                  <CardItem
                    translateZ={20}
                    translateX={-40}
                    as="button"
                    className="px-4 py-2 rounded-xl bg-white text-black  text-xs font-bold"
                  >
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Site
                    </a>
                  </CardItem>
                  {/* github */}
                  {
                    project.gitHubClient
                      ?
                      <>
                        <CardItem
                          translateZ={20}
                          translateX={40}
                          as="button"
                          className="px-4 py-2 rounded-xl bg-white text-black  text-xs font-bold"
                        >
                          <a
                            href={project.gitHubClient}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            GitHub (Client)
                          </a>
                        </CardItem>

                        <CardItem
                          translateZ={20}
                          translateX={40}
                          as="button"
                          className="px-4 py-2 rounded-xl bg-white text-black  text-xs font-bold"
                        >
                          <a
                            href={project.gitHubServer}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            GitHub (Server)
                          </a>
                        </CardItem>
                      </>
                      :
                      <CardItem
                        translateZ={20}
                        translateX={40}
                        as="button"
                        className="px-4 py-2 rounded-xl bg-white text-black  text-xs font-bold"
                      >
                        <a
                          href={project.gitHub}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          GitHub
                        </a>
                      </CardItem>
                  }
                </div>
                {/* project features */}
                <CardItem
                  as="ul"
                  translateZ="70"
                  className="list-disc list-inside mt-4 text-neutral-300 text-sm"
                >
                  <span className="font-semibold text-white">Features:</span>
                  {project.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </CardItem>
                {/* project technologies */}
                <CardItem
                  as="ul"
                  translateZ="80"
                  className="list-disc list-inside mt-4 text-neutral-300 text-sm"
                >
                  <p className="font-semibold text-white">Technologies:</p>
                  {project.technologies.map((tech, idx) => (
                    <button className='px-3 py-2 rounded-3xl border-2 m-1' key={idx}>{tech}</button>
                  ))}
                </CardItem>
              </CardBody>
            </CardContainer>
          )
        }
      </div>
    </div>
  );
}