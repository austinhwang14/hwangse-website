import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Hwang Structural Engineers, our mission, services, and leadership experience in structural engineering throughout Southern California.",
};
export default function About() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white px-8 py-16">
      <section className="max-w-5xl mx-auto">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
          About HSE
        </p>

        <h1 className="text-5xl font-semibold mb-8">
          Structural engineering built on collaboration, efficiency, and trust.
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-gray-300">
          <div className="md:col-span-2 space-y-6 leading-7">
            <p>
              HWANG Structural Engineers, also known as HSE, was founded by
              Junho Hwang, S.E. in 2015.
            </p>

            <p>
              HSE strives to deliver structural engineering services in the
              highest professional manner. We understand that every project is
              unique and requires clear communication, teamwork, and an open
              exchange of ideas between architects, owners, contractors, and
              consultants.
            </p>

            <p>
              Our philosophy is that structural systems should support and
              complement the architecture. Each system should be efficient,
              economical, constructible, and responsive to the project’s
              programmatic requirements.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl text-white mb-4">Services</h2>
            <ul className="space-y-3 text-gray-300">
              <li>Structural Design</li>
              <li>Seismic Retrofit</li>
              <li>Renovation</li>
              <li>Construction Administration</li>
              <li>Permit Support</li>
            </ul>
          </div>
        </div>

        <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Principal
            </h2>

            <p className="text-gray-300 leading-7">
              Junho Hwang, S.E. has extensive experience in structural design
              and project administration for single-family residential,
              multi-family residential, commercial, and other building types.
              His responsibilities include client coordination, structural
              system selection and design, construction document direction, and
              construction administration.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Education & Registrations
            </h2>

            <div className="space-y-6 text-gray-300">
              <div>
                <h3 className="text-white font-medium mb-2">Education</h3>
                <ul className="space-y-2">
                  <li>M.S.C.E. Structural Engineering, University of Texas at Austin</li>
                  <li>M.S. Architectural Engineering, Han Yang University, Seoul, Korea</li>
                  <li>B.S. Architectural Engineering, Han Yang University, Seoul, Korea</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-medium mb-2">Registrations</h3>
                <ul className="space-y-2">
                  <li>Licensed Professional Engineer, California</li>
                  <li>Licensed Structural Engineer, California</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 border-t border-white/10 pt-10">
          <h2 className="text-3xl font-semibold mb-4">Mission</h2>
          <p className="max-w-3xl text-gray-300 leading-7">
            Our mission is to provide practical, reliable, and efficient
            structural engineering solutions through thoughtful design,
            responsive communication, and strong collaboration with every project
            team.
          </p>
        </section>
      </section>
    </main>
  );
}