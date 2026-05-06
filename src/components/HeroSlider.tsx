import { useEffect, useState, useCallback } from "react";
import { ChevronRight, Play } from "lucide-react";
import hero1 from "@/assets/hero-1-cleanroom.mp4.asset.json";
import hero2 from "@/assets/hero-2-particles.mp4.asset.json";
import heroPowder from "@/assets/hero-3-powder.jpg";

type Slide = {
  id: string;
  type: "video" | "image";
  src: string;
  eyebrow: string;
  titleEn: string;
  highlight: string;
  titleEnEnd: string;
  subtitleKr: string;
  description: string;
};

const slides: Slide[] = [
  {
    id: "01",
    type: "video",
    src: hero1.url,
    eyebrow: "차세대 초정밀 소재 솔루션",
    titleEn: "Empowering Industries with",
    highlight: "Superior",
    titleEnEnd: "Materials.",
    subtitleKr: "정밀 제어된 첨단 소재로 미래를 설계합니다",
    description:
      "나노코리아는 맞춤형 소재로 프로젝트의 성공을 함께 합니다.",
  },
  {
    id: "02",
    type: "video",
    src: hero2.url,
    eyebrow: "Controlled Materials · 1–100nm",
    titleEn: "Controlled Materials,",
    highlight: "Reliable",
    titleEnEnd: "Performance.",
    subtitleKr: "검증된 품질, 안정적인 성능",
    description:
      "글로벌 첨단소재 제조사의 검증된 소재와 첨단 화합물을 국내 산업에 공급합니다.",
  },
  {
    id: "03",
    type: "image",
    src: heroPowder,
    eyebrow: "B2B · 기업 전문 공급",
    titleEn: "Built for the Industries that",
    highlight: "Build",
    titleEnEnd: "Tomorrow.",
    subtitleKr: "내일을 만드는 산업과 함께",
    description:
      "산업 표준에 충족하는 B2B 전문 공급망을 운영합니다.",
  },
];

const AUTOPLAY_MS = 8000;

const HeroSlider = () => {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  const goTo = useCallback((i: number) => {
    setActive(((i % slides.length) + slides.length) % slides.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / AUTOPLAY_MS) * 100);
      setProgress(pct);
      if (pct >= 100) {
        setActive((a) => (a + 1) % slides.length);
        setProgress(0);
        clearInterval(tick);
      }
    }, 50);
    return () => clearInterval(tick);
  }, [active]);

  const current = slides[active];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Media stack */}
      <div className="absolute inset-0 z-0">
        {slides.map((s, i) =>
          s.type === "video" ? (
            <video
              key={s.id}
              src={s.src}
              autoPlay
              muted
              loop
              playsInline
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out ${
                i === active ? "opacity-100 animate-ken-burns" : "opacity-0"
              }`}
            />
          ) : (
            <img
              key={s.id}
              src={s.src}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out ${
                i === active ? "opacity-100 animate-ken-burns" : "opacity-0"
              }`}
            />
          )
        )}
        <div className="absolute inset-0 bg-white/10" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-side)" }} />
        <div className="absolute inset-0" style={{ background: "var(--gradient-veil)" }} />
        <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />
        <div className="absolute inset-0 grid-bg opacity-[0.06] mask-fade-edges" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1440px] flex-col px-6 pt-28 pb-32 lg:px-12">
        <div className="flex flex-1 items-center">
          <div key={current.id} className="max-w-3xl animate-slide-up">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px w-12 bg-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                {current.eyebrow}
              </span>
            </div>

            <h1 className="mb-6 text-balance text-5xl font-medium leading-[1.05] tracking-tight text-white md:text-6xl lg:text-[5.25rem]">
              {current.titleEn}{" "}
              <span className="relative inline-block">
                <span className="gradient-text-prism">{current.highlight}</span>
              </span>{" "}
              {current.titleEnEnd}
            </h1>

            <h2 className="mb-3 text-base font-medium tracking-wide text-white/80 md:text-lg">
              {current.subtitleKr}
            </h2>
            <p className="mb-8 text-sm font-semibold tracking-[0.25em] text-accent">
              NANOKOREA
            </p>

            <p className="mb-12 max-w-[55ch] text-pretty text-base leading-relaxed text-white/70 md:text-lg">
              {current.description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#products"
                className="group relative inline-flex items-center gap-3 overflow-hidden bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-wider text-ink transition-all duration-500 hover:shadow-[0_0_40px_hsl(var(--accent)/0.5)]"
              >
                <span className="relative z-10">제품 보기</span>
                <ChevronRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="glass-dark inline-flex items-center gap-3 px-8 py-4 text-sm font-medium uppercase tracking-wider text-white transition-all hover:bg-white/15"
              >
                <Play className="h-3.5 w-3.5" />
                문의하기
              </a>
            </div>
          </div>
        </div>

        {/* Bottom controls */}
        <div className="relative z-10 mt-auto">
          <div className="flex items-end justify-between gap-8">
            <div className="flex items-center gap-5">
              <span className="font-mono text-sm font-semibold text-white">{current.id}</span>
              <div className="flex items-center gap-2">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => goTo(i)}
                    className="group relative h-[3px] w-16 overflow-hidden bg-white/15 transition-all hover:bg-white/30"
                    aria-label={`Slide ${i + 1}`}
                  >
                    {i === active && (
                      <span
                        className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-100 ease-linear"
                        style={{ width: `${progress}%` }}
                      />
                    )}
                    {i < active && <span className="absolute inset-0 bg-accent/70" />}
                  </button>
                ))}
              </div>
              <span className="font-mono text-xs text-white/40">/ 0{slides.length}</span>
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                Now Viewing
              </span>
              <span className="text-sm font-medium text-white/80">{current.titleEn} {current.highlight}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
