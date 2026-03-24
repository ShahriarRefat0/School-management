"use client"

import Image from "next/image"

const logos = [
  "/schools/logo1.png",
  "/schools/logo2.png",
  "/schools/logo3.png",
  "/schools/logo4.png",
  "/schools/logo5.png",
  "/schools/logo6.png",
  "/schools/logo7.png",
  "/schools/logo8.png",
  "/schools/logo9.png",
  "/schools/logo10.png",
]

export default function SchoolLogos() {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">

      {/* Heading */}
      <div className="max-w-5xl mx-auto text-center mb-14 px-4">
        <h2 className="text-3xl md:text-4xl font-normal text-gray-800 leading-snug">
          Join <span className="font-semibold text-black">125,000+</span> schools 
          and a galaxy of users
        </h2>
      </div>

      {/* Logo Scroll */}
      <div className="relative w-full overflow-hidden">

        <div className="flex w-max items-center gap-20 animate-scroll hover:[animation-play-state:paused]">

          {[...logos, ...logos].map((logo, i) => (
            <div key={i} className="flex items-center justify-center">
              <Image
                src={logo}
                alt="school logo"
                width={120}
                height={40}
                className="h-10 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"
              />
            </div>
          ))}

        </div>

      </div>

    </section>
  )
}