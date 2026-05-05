import { LifeBuoy, BookOpen } from "lucide-react";

const stats = [
  { value: "100", unit: "nm↓", label: "Particle Scale", caption: "Particle Scale" },
  { value: "B2B", unit: "", label: "Enterprise Supply", caption: "Enterprise Supply" },
];

const StatsBand = () => {
  return (
    <section className="relative bg-ink py-20 lg:py-24">
      <div className="absolute inset-0 grid-bg opacity-[0.04]" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />

      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-px bg-white/10 px-6 md:grid-cols-3 lg:px-12">
        {/* First stat */}
        <div className="bg-ink p-8 lg:p-10">
          <div className="mb-6 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
            01 · {stats[0].caption}
          </div>
          <div className="mb-4 flex items-baseline gap-2">
            <span className="text-5xl font-medium tracking-tight text-white lg:text-6xl">
              {stats[0].value}
            </span>
            <span className="text-2xl font-light text-accent">{stats[0].unit}</span>
          </div>
          <div className="text-sm text-white/60">{stats[0].label}</div>
        </div>

        {/* Tech Support + Reference Access — featured card (English, simple) */}
        <div className="relative overflow-hidden bg-gradient-to-br from-accent/15 via-ink to-ink p-8 lg:p-10">
          <div className="mb-6 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
            02 · R&D Material Support
          </div>
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-sm bg-accent/15 text-accent">
              <LifeBuoy className="h-5 w-5" />
            </div>
            <span className="text-2xl font-semibold text-white">+</span>
            <div className="grid h-11 w-11 place-items-center rounded-sm bg-accent/15 text-accent">
              <BookOpen className="h-5 w-5" />
            </div>
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-white">
            Tech Support &<br />Reference Access
          </h3>
        </div>

        {/* B2B */}
        <div className="bg-ink p-8 lg:p-10">
          <div className="mb-6 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
            03 · {stats[1].caption}
          </div>
          <div className="mb-4 flex items-baseline gap-2">
            <span className="text-5xl font-medium tracking-tight text-white lg:text-6xl">
              {stats[1].value}
            </span>
          </div>
          <div className="text-sm text-white/60">{stats[1].label}</div>
        </div>
      </div>
    </section>
  );
};

export default StatsBand;
