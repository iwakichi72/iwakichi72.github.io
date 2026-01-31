import profile from "@/data/profile.json";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Komorebi (sunlight through leaves) background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="komorebi-spot komorebi-1" />
        <div className="komorebi-spot komorebi-2" />
        <div className="komorebi-spot komorebi-3" />
        <div className="komorebi-spot komorebi-4" />
        <div className="komorebi-spot komorebi-5" />
        <div className="komorebi-spot komorebi-6" />
        <div className="komorebi-spot komorebi-7" />
      </div>

      <div className="relative z-10">
        <p className="mb-4 text-sm font-medium tracking-widest text-teal-400 uppercase">
          {profile.titleJa}
        </p>
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-white md:text-7xl">
          {profile.name}
        </h1>
        <p className="mb-8 text-xl text-gray-400 md:text-2xl">
          {profile.catchphrase}
        </p>
        <a
          href="#about"
          className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-6 py-3 text-sm text-teal-300 transition-colors hover:bg-teal-500/20"
        >
          View Profile
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
