import profile from "@/data/profile.json";
import FadeInSection from "@/components/ui/FadeInSection";

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <FadeInSection>
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            About
          </h2>
        </FadeInSection>

        <FadeInSection>
          <div className="rounded-2xl border border-dark-border bg-dark-card p-8">
            <p className="leading-relaxed text-gray-300">
              {profile.summary}
            </p>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
