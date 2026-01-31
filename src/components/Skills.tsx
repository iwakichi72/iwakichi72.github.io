import profile from "@/data/profile.json";
import FadeInSection from "@/components/ui/FadeInSection";
import ProgressBar from "@/components/ui/ProgressBar";

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <FadeInSection>
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            Skills
          </h2>
        </FadeInSection>

        <div className="grid gap-8 md:grid-cols-2">
          {profile.skills.map((category) => (
            <FadeInSection key={category.category}>
              <div className="rounded-2xl border border-dark-border bg-dark-card p-6">
                <h3 className="mb-4 text-lg font-semibold text-teal-300">
                  {category.category}
                </h3>
                {category.items.map((item) => (
                  <ProgressBar
                    key={item.name}
                    name={item.name}
                    years={item.years}
                  />
                ))}
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
