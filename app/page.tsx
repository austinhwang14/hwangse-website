import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProjects } from "../lib/getProjects";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Hwang Structural Engineers provides practical, efficient structural engineering services for residential, commercial, industrial, and specialty projects throughout Southern California.",
};

const heroImages = ["/hero-1.jpg", "/logo.jpg", "/hero-3.jpg", "/logo.jpg"];

const services = [
  "Structural Design",
  "Seismic Retrofit",
  "Renovation",
  "Permit Support",
];

const stats = [
  { value: "1000+", label: "Projects Supported" },
  { value: "30+", label: "Years of Experience" },
  { value: "2015", label: "Founded in California" },
  { value: "S.E.", label: "Licensed Structural Engineer" },
];

export default async function Home() {
  const projects = await getProjects();

  const featuredProjects = projects
    .filter((project) => project.selectedProject)
    .sort((a, b) => a.selectedOrder - b.selectedOrder)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white">
      <section className="relative min-h-[85vh] overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt="Hwang Structural Engineers project image"
              fill
              className="object-cover opacity-0 animate-[fadeSlide_25s_infinite]"
              style={{ animationDelay: `${index * 5}s` }}
              priority={index === 0}
            />
          ))}

          <div className="absolute inset-0 bg-black/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </div>

        <div className="relative z-10 min-h-[85vh] flex items-center px-6 sm:px-8">
          <div className="max-w-5xl animate-fade-up">
            <p className="text-sm uppercase tracking-[0.35em] text-[#d45a00] mb-5">
              Hwang Structural Engineers
            </p>

            <h1 className="text-5xl md:text-8xl font-semibold leading-tight mb-8">
              Structural engineering for projects across California.
            </h1>

            <p className="max-w-2xl text-lg text-gray-300 leading-8 mb-10">
              Practical, efficient, and collaborative structural engineering
              services for residential, commercial, industrial, and specialty
              building projects.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/projects"
                className="rounded-full bg-[#d45a00] px-7 py-3 text-sm font-medium hover:bg-[#f06a00] transition-all duration-300 text-center hover:scale-105"
              >
                View Projects
              </Link>

              <Link
                href="/contact"
                className="rounded-full border border-white/20 px-7 py-3 text-sm font-medium hover:bg-white/10 transition-all duration-300 text-center hover:scale-105"
              >
                Contact HSE
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-8 py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-300"
            >
              <p className="text-3xl sm:text-4xl font-semibold text-[#d45a00] mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-gray-400 leading-5">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 sm:px-8 py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
            Structural systems shaped around architecture, constructability, and
            clear communication.
          </h2>

          <p className="text-gray-300 leading-8 text-lg">
            Since 2015, HSE has worked with architects, owners, and contractors
            to provide structural solutions that are efficient, economical, and
            compatible with each project’s design goals.
          </p>
        </div>
      </section>

      <section className="px-6 sm:px-8 py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
            Services
          </p>

          <h2 className="text-4xl font-semibold mb-10">
            Core Engineering Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {services.map((service) => (
              <div
                key={service}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-xl font-medium mb-3">{service}</h3>
                <p className="text-sm text-gray-400 leading-6">
                  Professional structural engineering support tailored to each
                  project’s requirements.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {featuredProjects.length > 0 && (
        <section className="px-6 sm:px-8 py-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
                  Featured Work
                </p>

                <h2 className="text-4xl md:text-5xl font-semibold">
                  Selected Projects
                </h2>
              </div>

              <Link
                href="/projects"
                className="text-sm text-[#d45a00] hover:text-[#f06a00] transition"
              >
                View full project map →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {featuredProjects.map((project, index) => (
                <Link
                  key={project.id}
                  href={`/projects?project=${project.id}`}
                  className="group rounded-3xl overflow-hidden border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="relative h-64 overflow-hidden bg-black">
                    {project.mainImage ? (
                      <img
                        src={project.mainImage}
                        alt={project.name}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#d45a00]/40 to-black">
                        <p className="text-sm text-gray-300">
                          Project image coming soon
                        </p>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                    <div className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-md">
                      Selected {index + 1}
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-sm text-[#d45a00] mb-3">
                      {project.type}
                    </p>

                    <h3 className="text-xl font-semibold mb-3 leading-snug group-hover:text-[#f06a00] transition">
                      {project.name}
                    </h3>

                    <p className="text-sm text-gray-400 leading-6">
                      {project.location}
                    </p>

                    <p className="mt-5 text-sm text-white/70 group-hover:text-white transition">
                      View project details →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}