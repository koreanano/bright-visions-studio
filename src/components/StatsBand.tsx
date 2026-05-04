const stats = [
  { value: "100", unit: "nm↓", label: "나노소재 입자 스케일", caption: "Particle Scale" },
  { value: "Multi", unit: "", label: "취급 소재 라인업", caption: "Material Lineup" },
  { value: "B2B", unit: "", label: "기업 전문 공급", caption: "Enterprise Supply" },
  { value: "정식", unit: "", label: "글로벌 파트너십", caption: "Official Partnership" },
];

const StatsBand = () => {
  return (
    <section className="relative bg-ink py-20 lg:py-24">
      <div className="absolute inset-0 grid-bg opacity-[0.04]" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />

      <div className="relative mx-auto grid max-w-[1440px] grid-cols-2 gap-px bg-white/10 px-6 lg:grid-cols-4 lg:px-12">
        {stats.map((s, i) => (
          <div key={i} className="bg-ink p-8 lg:p-10">
            <div className="mb-6 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
              {String(i + 1).padStart(2, "0")} · {s.caption}
            </div>
            <div className="mb-4 flex items-baseline gap-2">
              <span className="text-5xl font-medium tracking-tight text-white lg:text-6xl">
                {s.value}
              </span>
              {s.unit && <span className="text-2xl font-light text-accent">{s.unit}</span>}
            </div>
            <div className="text-sm text-white/60">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsBand;
