"use client";

import { useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import type { Project } from "../lib/getProjects";

const categories = [
  "All",
  "Commercial",
  "House",
  "ADU",
  "Duplex",
  "APT",
  "Industrial",
  "Church",
  "TI",
  "Shoring",
  "Soft/NDC",
  "Misc",
  "Hospital",
  "Public",
];

function orangePinIcon() {
  return {
    url:
      "data:image/svg+xml;charset=UTF-8," +
      encodeURIComponent(`
        <svg width="22" height="30" viewBox="0 0 32 44" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 0C7.2 0 0 7.2 0 16c0 12 16 28 16 28s16-16 16-28C32 7.2 24.8 0 16 0z" fill="#d45a00"/>
          <circle cx="16" cy="16" r="6" fill="white"/>
        </svg>
      `),
  };
}

export default function ProjectsClient({
  projects,
  initialProjectId,
}: {
  projects: Project[];
  initialProjectId?: number;
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(
    projects.find((project) => project.id === initialProjectId) ?? projects[0]
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.type === selectedCategory;

    const searchText =
      `${project.name} ${project.type} ${project.architect} ${project.location}`.toLowerCase();

    return matchesCategory && searchText.includes(searchTerm.toLowerCase());
  });

  const displayedProject =
    filteredProjects.find((project) => project.id === selectedProject?.id) ??
    filteredProjects[0];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);

    const nextProjects =
      category === "All"
        ? projects
        : projects.filter((project) => project.type === category);

    if (nextProjects.length > 0) {
      setSelectedProject(nextProjects[0]);
    }
  };

  return (
    <main className="min-h-[calc(100vh-81px)] bg-[#0f0f0f] text-white">
      <section className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-81px)] lg:h-[calc(100vh-81px)]">
        <aside className="lg:col-span-3 bg-[#111111] border-b lg:border-b-0 lg:border-r border-white/10 lg:overflow-y-auto">
          <div className="p-5 sm:p-6 border-b border-white/10">
            <p className="text-xs uppercase tracking-[0.25em] text-[#d45a00] mb-2">
              Project Portfolio
            </p>

            <h1 className="text-2xl sm:text-3xl font-semibold mb-6">
              Completed Work
            </h1>

            <label className="block text-sm text-gray-400 mb-2">
              Filter by project type
            </label>

            <select
              value={selectedCategory}
              onChange={(event) => handleCategoryChange(event.target.value)}
              className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#d45a00]"
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                  className="bg-[#111111]"
                >
                  {category}
                </option>
              ))}
            </select>

            <div className="mt-4">
              <label className="block text-sm text-gray-400 mb-2">
                Search projects
              </label>

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search name, architect, address..."
                className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-[#d45a00]"
              />
            </div>

            <p className="text-sm text-gray-500 mt-4">
              Showing {filteredProjects.length} project
              {filteredProjects.length === 1 ? "" : "s"}
            </p>
          </div>

          <div className="p-4 flex flex-col gap-3 max-h-[470px] overflow-y-auto lg:max-h-none">
            {filteredProjects.length === 0 ? (
              <p className="text-sm text-gray-500 p-3">
                No projects match this search.
              </p>
            ) : (
              filteredProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`text-left p-4 rounded-2xl transition-all duration-300 border hover:-translate-y-1 ${
                    displayedProject?.id === project.id
                      ? "bg-[#d45a00]/20 border-[#d45a00]/60 shadow-[0_0_30px_rgba(212,90,0,0.15)]"
                      : "bg-white/[0.03] border-white/10 hover:bg-white/[0.07]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-medium leading-snug">
                      {project.name}
                    </h3>

                    <span className="shrink-0 rounded-full bg-white/10 px-2 py-1 text-[10px] text-gray-300">
                      {project.type}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mt-3 leading-5">
                    {project.location}
                  </p>
                </button>
              ))
            )}
          </div>
        </aside>

        <section className="lg:col-span-9 grid grid-cols-1 lg:grid-cols-5 bg-[#1a1a1a]">
          <div className="lg:col-span-3 relative h-[360px] sm:h-[520px] lg:h-full">
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
              <Map
                defaultCenter={{ lat: 34.0522, lng: -118.2437 }}
                defaultZoom={10}
                gestureHandling="greedy"
                className="h-full w-full"
                styles={[
                  { elementType: "geometry", stylers: [{ color: "#1d1d1d" }] },
                  {
                    elementType: "labels.text.stroke",
                    stylers: [{ color: "#1d1d1d" }],
                  },
                  {
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#8a8a8a" }],
                  },
                  {
                    featureType: "road",
                    elementType: "geometry",
                    stylers: [{ color: "#2b2b2b" }],
                  },
                  {
                    featureType: "road",
                    elementType: "geometry.stroke",
                    stylers: [{ color: "#212121" }],
                  },
                  {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{ color: "#111111" }],
                  },
                  {
                    featureType: "poi",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#666666" }],
                  },
                  {
                    featureType: "transit",
                    stylers: [{ visibility: "off" }],
                  },
                ]}
              >
                {filteredProjects.map((project) => (
                  <Marker
                    key={project.id}
                    position={project.coordinates}
                    onClick={() => setSelectedProject(project)}
                    icon={orangePinIcon()}
                  />
                ))}
              </Map>
            </APIProvider>
          </div>

          <aside className="lg:col-span-2 bg-[#0f0f0f] border-t lg:border-t-0 lg:border-l border-white/10 overflow-y-auto">
            {displayedProject ? (
              <div className="p-5 sm:p-8">
                {displayedProject.images.length > 0 && (
                  <div className="mb-8 space-y-4">
                    {displayedProject.images.map((image) => (
                      <div
                        key={image}
                        className="overflow-hidden rounded-2xl border border-white/10 bg-black/20"
                      >
                        <img
                          src={image}
                          alt={displayedProject.name}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          className="w-full h-72 object-cover transition duration-500 hover:scale-[1.03]"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-xs uppercase tracking-[0.25em] text-[#d45a00] mb-3">
                  Selected Project
                </p>

                <h2 className="text-3xl sm:text-4xl font-semibold leading-tight mb-4">
                  {displayedProject.name}
                </h2>

                <button
                  onClick={() => setIsDetailOpen(true)}
                  className="mb-6 rounded-full bg-[#d45a00] px-5 py-2 text-sm font-medium text-white hover:bg-[#b84d00] transition-all duration-300 hover:scale-105"
                >
                  View Project Details
                </button>

                <div className="space-y-5 text-gray-300">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-1">
                      Type
                    </p>
                    <p>{displayedProject.type}</p>
                  </div>

                  {displayedProject.architect && (
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-1">
                        Architect
                      </p>
                      <p>{displayedProject.architect}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-1">
                      Location
                    </p>
                    <p>{displayedProject.location}</p>
                  </div>

                  {displayedProject.description && (
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-1">
                        Description
                      </p>
                      <p className="leading-7">
                        {displayedProject.description}
                      </p>
                    </div>
                  )}

                  {displayedProject.scope && (
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-1">
                        Scope
                      </p>
                      <p className="leading-7">{displayedProject.scope}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-8 text-gray-400">
                Select a project to view details.
              </div>
            )}
          </aside>
        </section>
      </section>

      {isDetailOpen && displayedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#111111] shadow-2xl">
            <button
              onClick={() => setIsDetailOpen(false)}
              className="absolute right-5 top-5 z-20 rounded-full bg-black/70 px-4 py-2 text-sm text-white backdrop-blur-md hover:bg-black transition"
            >
              Close
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="max-h-[92vh] overflow-y-auto border-b border-white/10 lg:border-b-0 lg:border-r">
                {displayedProject.images.length > 0 ? (
                  <div className="grid gap-2 p-2">
                    {displayedProject.images.map((image, index) => (
                      <div
                        key={index}
                        className="overflow-hidden rounded-2xl bg-black"
                      >
                        <img
                          src={image}
                          alt={`${displayedProject.name} image ${index + 1}`}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          className="w-full object-cover transition duration-700 hover:scale-[1.02]"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex min-h-[320px] items-center justify-center p-8 text-center text-gray-500">
                    Project images coming soon.
                  </div>
                )}
              </div>

              <div className="max-h-[92vh] overflow-y-auto p-8 lg:p-10">
                <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#d45a00]">
                  {displayedProject.type}
                </p>

                <h2 className="mb-6 text-4xl font-semibold leading-tight">
                  {displayedProject.name}
                </h2>

                <div className="mb-8 flex flex-wrap gap-3">
                  <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
                    {displayedProject.location}
                  </div>

                  {displayedProject.architect && (
                    <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
                      {displayedProject.architect}
                    </div>
                  )}
                </div>

                <div className="space-y-10">
                  {displayedProject.description && (
                    <div>
                      <h3 className="mb-4 text-xl font-medium">
                        Project Description
                      </h3>

                      <p className="leading-8 text-gray-300">
                        {displayedProject.description}
                      </p>
                    </div>
                  )}

                  {displayedProject.scope && (
                    <div>
                      <h3 className="mb-4 text-xl font-medium">
                        Scope of Services
                      </h3>

                      <p className="leading-8 text-gray-300">
                        {displayedProject.scope}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}