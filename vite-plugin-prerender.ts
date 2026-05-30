import type { Plugin } from "vite";
import path from "node:path";
import fs from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

const SITE = "https://nano-korea.co.kr";

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const clip = (s: string, n = 158) => {
  const t = s.replace(/\s+/g, " ").trim();
  return t.length > n ? t.slice(0, n - 1) + "…" : t;
};

const STATIC_ROUTES: { path: string; title: string; desc: string }[] = [
  {
    path: "/",
    title: "나노코리아 | 첨단나노소재 B2B 전문공급",
    desc: "첨단세라믹, 나노소재, 무기화합물 B2B 전문 공급업체 나노코리아. 반도체·배터리·항공 산업용 소재를 공급합니다.",
  },
  {
    path: "/about",
    title: "회사소개 | 나노코리아",
    desc: "나노코리아는 첨단 나노소재 및 무기화합물을 전문으로 공급하는 B2B 기업입니다.",
  },
  {
    path: "/service",
    title: "서비스 안내 | 나노코리아",
    desc: "맞춤 입도 주문 제작, 엔지니어 기술지원, 레퍼런스 자료 제공 등 나노코리아의 전문 서비스 안내.",
  },
  {
    path: "/faq",
    title: "자주 묻는 질문 (FAQ) | 나노코리아",
    desc: "나노코리아 제품 및 서비스에 관한 자주 묻는 질문과 답변입니다.",
  },
  {
    path: "/news",
    title: "뉴스 & 공지사항 | 나노코리아",
    desc: "나노코리아의 최신 뉴스, 공지사항, 제품 업데이트를 확인하세요.",
  },
  {
    path: "/privacy",
    title: "개인정보처리방침 | 나노코리아",
    desc: "나노코리아의 개인정보 수집·이용·보관에 관한 처리방침입니다.",
  },
  {
    path: "/terms",
    title: "이용약관 | 나노코리아",
    desc: "나노코리아 웹사이트 이용약관입니다.",
  },
  {
    path: "/products",
    title: "전체 제품 목록 | 나노코리아",
    desc: "나노코리아의 전체 제품 카테고리를 확인하세요. 탄산염, 불화물, 배터리소재, 희토류 등 다양한 나노소재를 공급합니다.",
  },
];

const CATEGORY_SEO: Record<string, { title: string; description: string }> = {
  carbonates: {
    title: "탄산염 (Carbonates) | 나노코리아",
    description: "고순도 탄산염 나노소재. 탄산리튬, 탄산칼슘 등 산업용 탄산염 소재를 공급합니다.",
  },
  fluorides: {
    title: "불화물 (Fluorides) | 나노코리아",
    description: "고순도 불화물 나노소재. 불화리튬, 불화칼슘 등 산업용 불화물 소재를 공급합니다.",
  },
  manganese: {
    title: "망간 소재 (Manganese) | 나노코리아",
    description: "고순도 망간 나노소재. 배터리 및 전자 산업용 망간 소재를 공급합니다.",
  },
  battery: {
    title: "배터리 소재 (Battery Materials) | 나노코리아",
    description: "2차전지·배터리용 나노소재. 양극재, 음극재 등 배터리 핵심 소재를 공급합니다.",
  },
  corundum: {
    title: "코런덤 (Corundum) | 나노코리아",
    description: "고순도 코런덤(산화알루미늄) 나노소재. 반도체·광학 산업용 소재를 공급합니다.",
  },
  carbides: {
    title: "탄화물 (Carbides) | 나노코리아",
    description: "고순도 탄화물 나노소재. 탄화규소, 탄화붕소 등 산업용 탄화물 소재를 공급합니다.",
  },
  nitrides: {
    title: "질화물 (Nitrides) | 나노코리아",
    description: "고순도 질화물 나노소재. 질화규소, 질화붕소 등 산업용 질화물 소재를 공급합니다.",
  },
  metals: {
    title: "금속 분말 (Metals) | 나노코리아",
    description: "고순도 금속 나노분말. 구리, 니켈, 은 등 산업용 금속 나노소재를 공급합니다.",
  },
  rareearth: {
    title: "희토류 (Rare Earth) | 나노코리아",
    description: "고순도 희토류 나노소재. 산화세륨, 산화란타넘 등 희토류 소재를 공급합니다.",
  },
  quartz: {
    title: "쿼츠 (Quartz) | 나노코리아",
    description: "고순도 쿼츠(석영) 소재. 반도체·광학 산업용 쿼츠 제품을 공급합니다.",
  },
  hpa: {
    title: "고순도 알루미나 (HPA) | 나노코리아",
    description: "99.99% 이상 고순도 알루미나(HPA). LED·배터리·반도체 산업용 소재를 공급합니다.",
  },
  nano: {
    title: "나노소재 (Nano Materials) | 나노코리아",
    description: "다양한 나노소재 제품군. 산화물, 복합소재 등 첨단 나노소재를 공급합니다.",
  },
  others: {
    title: "기타 제품 (Others) | 나노코리아",
    description: "나노코리아의 기타 특수 소재 제품군. 다양한 산업용 특수 소재를 공급합니다.",
  },
  oxides: {
    title: "산화물 (Oxides) | 나노코리아",
    description: "고순도 산화물 나노소재. 산업별 맞춤형 산화물 원료를 공급합니다.",
  },
  silicagel: {
    title: "실리카겔 (Silica Gel) | 나노코리아",
    description: "고순도 실리카겔 소재. 다양한 산업 응용을 위한 실리카겔 제품을 공급합니다.",
  },
};

type Cat = { key: string; kr: string; en: string; items: { name: string; formula: string; desc: string }[] };

async function loadProducts(): Promise<{ CATEGORIES: Cat[]; slugify: (s: string) => string }> {
  const result = await build({
    entryPoints: [path.resolve("src/data/products.ts")],
    bundle: true,
    format: "esm",
    write: false,
    platform: "node",
    target: "node18",
    logLevel: "silent",
  });
  const code = result.outputFiles[0].text;
  const tmp = path.resolve("node_modules/.cache-prerender-products.mjs");
  await fs.mkdir(path.dirname(tmp), { recursive: true });
  await fs.writeFile(tmp, code);
  const mod = await import(pathToFileURL(tmp).href + `?t=${Date.now()}`);
  return { CATEGORIES: mod.CATEGORIES, slugify: mod.slugify };
}

function applyMeta(template: string, title: string, desc: string, canonical: string): string {
  let html = template;
  const t = esc(title);
  const d = esc(desc);
  const c = esc(canonical);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`);
  html = html.replace(
    /<meta\s+name="description"[^>]*>/i,
    `<meta name="description" content="${d}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:title"[^>]*>/i,
    `<meta property="og:title" content="${t}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:description"[^>]*>/i,
    `<meta property="og:description" content="${d}" />`,
  );
  html = html.replace(
    /<meta\s+name="twitter:title"[^>]*>/i,
    `<meta name="twitter:title" content="${t}" />`,
  );
  html = html.replace(
    /<meta\s+name="twitter:description"[^>]*>/i,
    `<meta name="twitter:description" content="${d}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:url"[^>]*>/i,
    `<meta property="og:url" content="${c}" />`,
  );
  // Canonical: replace if present, else inject before </head>
  if (/<link\s+rel="canonical"[^>]*>/i.test(html)) {
    html = html.replace(
      /<link\s+rel="canonical"[^>]*>/i,
      `<link rel="canonical" href="${c}" />`,
    );
  } else {
    html = html.replace(/<\/head>/i, `    <link rel="canonical" href="${c}" />\n  </head>`);
  }
  return html;
}

export function prerenderSeoPlugin(): Plugin {
  return {
    name: "prerender-seo",
    apply: "build",
    async closeBundle() {
      const outDir = path.resolve("dist");
      const tplPath = path.join(outDir, "index.html");
      let template: string;
      try {
        template = await fs.readFile(tplPath, "utf8");
      } catch {
        return; // not the main client build (e.g., SSR build)
      }

      const { CATEGORIES, slugify } = await loadProducts();

      const routes: { path: string; title: string; desc: string }[] = [...STATIC_ROUTES];

      for (const cat of CATEGORIES) {
        const cseo = CATEGORY_SEO[cat.key];
        if (cseo) {
          routes.push({
            path: `/products/${cat.key}`,
            title: cseo.title,
            desc: cseo.description,
          });
        }
        for (const p of cat.items) {
          const slug = slugify(p.name);
          const parts = p.name.split("/").map((s) => s.trim());
          const titleName =
            parts.length > 1 ? `${parts[0]} (${parts.slice(1).join(" / ")})` : p.name;
          const title = `${titleName} | 나노코리아`;
          const detail = `${p.name}${p.formula ? ` (${p.formula})` : ""} - ${p.desc}`;
          routes.push({
            path: `/products/${cat.key}/${slug}`,
            title,
            desc: clip(detail),
          });
        }
      }

      let count = 0;
      for (const r of routes) {
        const canonical = `${SITE}${r.path}`;
        const html = applyMeta(template, r.title, r.desc, canonical);
        const outPath =
          r.path === "/"
            ? path.join(outDir, "index.html")
            : path.join(outDir, r.path.replace(/^\//, ""), "index.html");
        await fs.mkdir(path.dirname(outPath), { recursive: true });
        await fs.writeFile(outPath, html, "utf8");
        count++;
      }
      // eslint-disable-next-line no-console
      console.log(`[prerender-seo] wrote ${count} HTML files with per-route meta`);
    },
  };
}
