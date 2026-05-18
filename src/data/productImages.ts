import quartzRaw from "@/assets/products/quartz-raw.jpg";
import quartzFusedA from "@/assets/products/quartz-fused-a.jpg";
import quartzFusedB from "@/assets/products/quartz-fused-b.jpg";
import quartzFusedC from "@/assets/products/quartz-fused-c.jpg";
import quartzSilicaPowder from "@/assets/products/quartz-silica-powder.jpg";
import quartzSand from "@/assets/products/quartz-sand.jpg";
import yttrium from "@/assets/products/yttrium-oxide.jpg";
import ysz from "@/assets/products/ysz.jpg";
import zirconiaDental from "@/assets/products/zirconia-dental.jpg";
import zirconiaIndustrial from "@/assets/products/zirconia-industrial.jpg";
import zirconiaAtz from "@/assets/products/zirconia-atz.jpg";
import zirconiaZta from "@/assets/products/zirconia-zta.jpg";
import zirconiaBeads from "@/assets/products/zirconia-beads.jpg";
import aluminaD99 from "@/assets/products/alumina-d99.jpg";
import aluminaAlpha from "@/assets/products/alumina-alpha.jpg";
import aluminaHpa from "@/assets/products/alumina-hpa.jpg";
import aluminaFused from "@/assets/products/alumina-fused.jpg";
import aluminaTabular from "@/assets/products/alumina-tabular.jpg";
import sic from "@/assets/products/sic.jpg";
import wc from "@/assets/products/wc.jpg";
import bn from "@/assets/products/bn.jpg";
import aln from "@/assets/products/aln.jpg";
import sin from "@/assets/products/sin.jpg";
import tin from "@/assets/products/tin.jpg";
import manganese from "@/assets/products/manganese.jpg";
import copper from "@/assets/products/copper.jpg";
import zinc from "@/assets/products/zinc.jpg";
import chromium from "@/assets/products/chromium.jpg";
import nickel from "@/assets/products/nickel.jpg";
import graphite from "@/assets/products/graphite.jpg";
import nanoAlumina from "@/assets/products/nano-alumina.jpg";
import nanoZirconia from "@/assets/products/nano-zirconia.jpg";
import nanoZno from "@/assets/products/nano-zno.jpg";
import nanoSilica from "@/assets/products/nano-silica.jpg";
import nanoYsz from "@/assets/products/nano-ysz.jpg";
import carbonateSrMgBa from "@/assets/products/carbonate-srmgba.jpg";
import carbonateCaLi from "@/assets/products/carbonate-cali.jpg";
import fluorite from "@/assets/products/fluorite.jpg";
import silicaFumed from "@/assets/products/silica-fumed.jpg";
import hfoMoo from "@/assets/products/hfo-moo.jpg";
import mn3o4 from "@/assets/products/mn3o4.jpg";
import batio3 from "@/assets/products/batio3.jpg";
import lialh4 from "@/assets/products/lialh4.jpg";
import magnesium from "@/assets/products/magnesium.jpg";
import cordierite from "@/assets/products/cordierite.jpg";
import zrsio4 from "@/assets/products/zrsio4.jpg";
import magnesiumOxide from "@/assets/products/magnesium-oxide.jpg";

// Match by exact product name (Korean / English)
export const PRODUCT_IMAGES: Record<string, string> = {
  "천연 규석 원석 / Natural Silica (Quartz Ore)": quartzRaw,
  "용융석영 A등급 / Fused Quartz Grade A": quartzFusedA,
  "용융석영 B등급 / Fused Quartz Grade B": quartzFusedB,
  "용융석영 C등급 / Fused Quartz Grade C": quartzFusedC,
  "용융 실리카 분말 / Fused Silica Powder": quartzSilicaPowder,
  "용융석영사 A·B·C / Fused Quartz Sand A·B·C": quartzSand,
  "산화이트륨 / Yttrium Oxide": yttrium,
  "이트륨 안정화 지르코니아 / Yttria-Stabilized Zirconia": ysz,
  "치과용 지르코니아 분말 / Dental Zirconia Powder": zirconiaDental,
  "산업용 지르코니아 분말 / Industrial Zirconia Powder": zirconiaIndustrial,
  "ATZ 분말 / Alumina Toughened Zirconia": zirconiaAtz,
  "ZTA 분말 / Zirconia Toughened Alumina": zirconiaZta,
  "지르코니아 그라인딩 비드 / Zirconia Grinding Beads": zirconiaBeads,
  "산화알루미늄 D99 / Aluminum Oxide D99": aluminaD99,
  "고순도 알파 알루미나 / High-Purity Alpha Alumina": aluminaAlpha,
  "초고순도 알루미나 (HPA) / High Purity Alumina": aluminaHpa,
  "용융 알루미나 (WFA/BFA) / Fused Alumina (WFA/BFA)": aluminaFused,
  "판상 알루미나 / Tabular Alumina": aluminaTabular,
  "탄화규소 분말 / Silicon Carbide Powder": sic,
  "탄화텅스텐 / 탄화붕소 / Tungsten Carbide & Boron Carbide": wc,
  "질화붕소 분말 / Boron Nitride Powder": bn,
  "질화알루미늄 분말 / Aluminum Nitride Powder": aln,
  "질화규소 분말 / Silicon Nitride Powder": sin,
  "질화티타늄 / 질화지르코늄 / Titanium Nitride & Zirconium Nitride": tin,
  "전해 망간 플레이크 / Electrolytic Manganese Flake": manganese,
  "구리 분말 / Copper Powder": copper,
  "아연 분말 / Zinc Powder": zinc,
  "크롬 분말 / Chromium Powder": chromium,
  "실리콘 / 니켈 분말 / Silicon & Nickel Powder": nickel,
  "흑연 분말 / Graphite Powder": graphite,
  "나노 알루미나 / Nano Alumina": nanoAlumina,
  "나노 지르코니아 / Nano Zirconia": nanoZirconia,
  "나노 산화아연 / Nano Zinc Oxide": nanoZno,
  "나노 실리카 / Nano Silica": nanoSilica,
  "나노 YSZ / Nano Yttria-Stabilized Zirconia": nanoYsz,
  "탄산염 (Sr/Mg/Ba) / Strontium·Magnesium·Barium Carbonate": carbonateSrMgBa,
  "탄산칼슘 / 탄산리튬 / Calcium Carbonate & Lithium Carbonate": carbonateCaLi,
  "형석 / 불화칼슘 / 불화리튬 / Fluorite, Calcium Fluoride & Lithium Fluoride": fluorite,
  "실리카 (이산화규소) / Silica (Silicon Dioxide)": silicaFumed,
  "산화하프늄 / 산화몰리브덴 / Hafnium Oxide & Molybdenum Oxide": hfoMoo,
  "사산화삼망간 / Trimanganese Tetraoxide": mn3o4,
  "티탄산바륨 / Barium Titanate": batio3,
  "수소화알루미늄리튬 / Lithium Aluminum Hydride": lialh4,
  "마그네슘 비드/그레인 / Magnesium Beads & Granules": magnesium,
  "근청석 / Cordierite": cordierite,
  "규산지르코늄 / Zirconium Silicate": zrsio4,
  "산화마그네슘 / Magnesium Oxide": magnesiumOxide,
  // 이차전지 카테고리 매핑 (기존 자산 재활용)
  "탄산리튬 / Lithium Carbonate": carbonateCaLi,
  "불화리튬 / Lithium Fluoride": fluorite,
  "전해 망간 금속 플레이크 / Electrolytic Manganese Metal Flakes": manganese,
  "흑연 분말 (음극재용) / Graphite Powder (Anode Grade)": graphite,

};

export const getProductImage = (name: string) => PRODUCT_IMAGES[name];
