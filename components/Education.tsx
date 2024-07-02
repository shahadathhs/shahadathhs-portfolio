import React from "react";
import { Meteors } from "./ui/meteors";
import Image from "next/image";
import ph1 from "@/public/ph-level-1_page-0001.jpg";

export function Education() {
  return (
    <div className="w-full px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">Education</h1>
        <p className="text-lg text-gray-400 max-w-lg mx-auto">
          My educational background is providing me a strong foundation in both science and statistics. Below are the details of my educational qualifications.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center min-h-[400px]">
        <div className="w-full relative max-w-sm mx-auto z-0">
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
          <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
            <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-2 w-2 text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                />
              </svg>
            </div>

            <h1 className="font-bold text-2xl text-white mb-4">
              Bachelor of Science in Statistics
            </h1>

            <h2 className="font-bold text-lg text-gray-400 mb-4">
              June 2023 to June 2027
            </h2>

            <h3 className="font-bold text-lg text-gray-400 mb-4">
              National University of Bangladesh
            </h3>

            <Meteors number={20} />
          </div>
        </div>
        
        <div className="w-full relative max-w-sm mx-auto z-0">
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
          <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
            <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-2 w-2 text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                />
              </svg>
            </div>

            <h1 className="font-bold text-2xl text-white mb-4">
              Higher Secondary School Certificate in Science
            </h1>

            <h2 className="font-bold text-lg text-gray-400 mb-4">
              December 2022
            </h2>

            <h3 className="font-bold text-lg text-gray-400 mb-4">
              Chattogram Cantonment Public College
            </h3>

            <Meteors number={20} />
          </div>
        </div>

        <div className="max-w-3xl mx-auto col-span-1 md:col-span-2 m-10">
          <Image
            src={ph1}
            alt="Education Certificate"
            width={800}
            height={800}
          />
        </div>
      </div>
    </div>
  );
}
