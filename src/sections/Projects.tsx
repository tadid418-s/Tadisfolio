import inventoryos from "@/assets/images/inventoryos.png";
import rideethiopia from "@/assets/images/rideethiopia.png";
import roamlytravels from "@/assets/images/roamlytravels.png";
import llama from "@/assets/images/llama.png";
import Image from "next/image";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";

const portfolioProjects = [
  {
    company: "Personal Project",
    year: "2024",
    title: "InventoryOS - Inventory Management System",
    results: [
      {
        title: "Designed and implemented the core front-end user interfaces.",
      },
      {
        title: "Built interactive reporting charts and a sleek inventory dashboard.",
      },
      {
        title: "Ensured a deeply responsive and optimized cross-device user experience.",
      },
    ],
    link: "https://inventory-os.vercel.app/",
    option: "Visit Live WebApp",
    image: inventoryos,
  },
  {
    company: "Personal Project",
    year: "2024",
    title: "Ride - Ethiopian Equivalent for Uber",
    results: [
      {
        title: "Developed an engaging and professional front-end for the ride-sharing platform.",
      },
      {
        title: "Implemented clean UI components and map-integrated visual layouts.",
      },
      {
        title: "Focused on mobile-first front-end methodology and modern web capabilities.",
      },
    ],
    link: "https://ride-chi.vercel.app/",
    option: "Visit Live WebApp",
    image: rideethiopia,
  },
  {
    company: "Personal Project",
    year: "2024",
    title: "Roamly Travels - Travel Agent Portal",
    results: [
      {
        title: "Contributed to front-end architecture, building vibrant, engaging views.",
      },
      {
        title: "Created booking forms, sleek destination display cards, and visual elements.",
      },
      {
        title: "Produced high-quality UI/UX with smooth transitions and sophisticated styling.",
      },
    ],
    link: "https://roamly-travels.vercel.app/",
    option: "Visit Live WebApp",
    image: roamlytravels,
  },
  {
    company: "Personal Project",
    year: "2024",
    title: "Llama - Ai API and Chat Webapp",
    results: [
      {
        title:
          "Developed Llama 3.3 70B API, delivering advanced, context-aware AI responses.",
      },
      {
        title: "Built interactive chat feature using Next.js, and TailwindCSS.",
      },
      {
        title:
          "Achieved performance on par with GPT-4.o, enhancing AI versatility.",
      },
    ],
    link: "https://llama-ai.vercel.app",
    option: "Visit Live WebApp",
    image: llama,
  },
];

export const ProjectsSection = () => {
  return (
    <section className="pb-16 lg:py-24" id="project">
      <div className="container">
        <SectionHeader
          eyebrow="Real-World Results"
          title="Featured Projects"
          description="See How I Transformed Concepts Into Digital Experience."
        />
        <div className="md:mt-20 flex flex-col mt-10 gap-20">
          {portfolioProjects.map((project, projectIndex) => (
            <div
              key={project.title}
              className="after:pointer-events-none sticky transition-all duration-300 hover:scale-[1.01]"
              style={{ top: `calc(64px + ${projectIndex * 60}px)`, willChange: 'transform' }}
            >
              <Card>
                <div className="px-6 pt-6 pb-0 md:pt-12 md:px-10 lg:pt-16 lg:px-20 transition-all duration-300">
                  <div className="lg:grid lg:grid-cols-2 lg:gap-16 relative">
                    <div className="lg:pb-16">
                      <div className="inline-flex items-center gap-2 uppercase font-semibold tracking-widest bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent bg-clip-text">
                        <span>{project.company}</span>
                        <span className="text-white/30">&bull;</span>
                        <span>{project.year}</span>
                      </div>
                      <h3 className="font-serif text-2xl mt-3 md:mt-5 md:text-4xl font-bold">
                        {project.title}
                      </h3>
                      <hr className="border-t-2 border-white/10 my-4 md:my-6" />
                      <ul className="flex flex-col gap-4 my-6 md:my-8">
                        {project.results.map((result, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-3 text-sm md:text-base text-white/60 hover:text-white/90 transition-colors duration-200"
                          >
                            <FaRegCircleCheck className="text-emerald-400 flex-shrink-0" />
                            <span>{result.title}</span>
                          </li>
                        ))}
                      </ul>
                      <a
                        href={project.link}
                        className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 group"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[4px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                          <span
                            className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
                            style={{
                              animation: "spin 4s linear infinite",
                            }}
                          />

                          <span className="gap-2 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black backdrop-blur-md">
                            <span>{project.option}</span>
                            <FaExternalLinkAlt />
                          </span>
                        </button>
                      </a>
                    </div>
                    <div>
                      <Image
                        src={project.image}
                        alt={project.title}
                        className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
