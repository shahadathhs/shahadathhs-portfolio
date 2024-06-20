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
      gitHubServer: 'https://github.com/shahadathhs/donatelife-server'
    },
    {
      projectName: 'RoomReady',
      projectTheme: 'A complete MERN Stack Hotel Room Booking website.',
      projectImage: roomReadyPic,
      liveLink: 'https://eleventh-a-roomready.web.app',
      gitHubClient: 'https://github.com/shahadathhs/room-ready-client',
      gitHubServer: 'https://github.com/shahadathhs/room-ready-server'
    },
    {
      projectName: 'Crafttopia',
      projectTheme: 'A MERN Stack Craft Store website.',
      projectImage: craftPic,
      liveLink: 'https://tenth-a-craftopia.web.app',
      gitHubClient: 'https://github.com/shahadathhs/craftopia-client',
      gitHubServer: 'https://github.com/shahadathhs/craftopia-server'
    },
    {
      projectName: 'Industrial Plaza',
      projectTheme: 'A simple real state website with firebase authentication.',
      projectImage: industryPic,
      liveLink: 'https://ningth-a-industrial-plaza.web.app',
      gitHub: 'https://github.com/shahadathhs/industrial-plaza',
    },
  ]

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
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
            </CardBody>
          </CardContainer>
        )
      }
    </div>
  );
}