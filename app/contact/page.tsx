import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Hwang Structural Engineers for structural engineering services, project inquiries, and consultations throughout Southern California.",
};

export default function Contact() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white px-8 py-16">
      <section className="max-w-6xl mx-auto">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
          Contact
        </p>

        <h1 className="text-5xl font-semibold mb-10">
          Get in touch with Hwang Structural Engineers.
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl mb-2">Phone</h2>
              <p className="text-gray-300">213-268-0935</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl mb-2">Email</h2>
              <p className="text-gray-300">juno@hwangse.com</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl mb-2">Office</h2>
              <p className="text-gray-300">
                2450 W Main Street<br />
                Alhambra, CA 91801
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/10 min-h-[420px]">
            <iframe
              src="https://www.google.com/maps?q=2450%20W%20Main%20Street%2C%20Alhambra%2C%20CA%2091801&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
              className="min-h-[420px]"
            />
          </div>
        </div>
      </section>
    </main>
  );
}