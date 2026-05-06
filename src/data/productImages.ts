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

// Match by exact product name (Korean)
export const PRODUCT_IMAGES: Record<string, string> = {
  "천연 규석 원석": quartzRaw,
  "용융석영 A등급": quartzFusedA,
  "용융석영 B등급": quartzFusedB,
  "용융석영 C등급": quartzFusedC,
  "용융 실리카 분말": quartzSilicaPowder,
  "용융석영사 A·B·C": quartzSand,
  "산화이트륨 (Yttrium Oxide)": yttrium,
  "이트륨 안정화 지르코니아": ysz,
  "치과용 지르코니아 분말": zirconiaDental,
  "산업용 지르코니아 분말": zirconiaIndustrial,
  "ATZ 분말": zirconiaAtz,
  "ZTA 분말": zirconiaZta,
  "지르코니아 그라인딩 비드": zirconiaBeads,
  "산화알루미늄 D99": aluminaD99,
  "고순도 알파 알루미나": aluminaAlpha,
  "초고순도 알루미나 (HPA)": aluminaHpa,
  "용융 알루미나 (WFA/BFA)": aluminaFused,
  "판상 알루미나 (Tabular)": aluminaTabular,
  "탄화규소 분말": sic,
  "탄화텅스텐 / 탄화붕소": wc,
  "질화붕소 분말": bn,
  "질화알루미늄 분말": aln,
  "질화규소 분말": sin,
  "질화티타늄 / 질화지르코늄": tin,
  "전해 망간 플레이크": manganese,
  "구리 분말": copper,
  "아연 분말": zinc,
  "크롬 분말": chromium,
  "실리콘 / 니켈 분말": nickel,
  "흑연 분말": graphite,
  "나노 알루미나": nanoAlumina,
  "나노 지르코니아": nanoZirconia,
  "나노 산화아연": nanoZno,
  "나노 실리카": nanoSilica,
  "나노 YSZ": nanoYsz,
  "탄산염 (Sr/Mg/Ba)": carbonateSrMgBa,
  "탄산칼슘 / 탄산리튬": carbonateCaLi,
  "형석 / 불화칼슘 / 불화리튬": fluorite,
  "실리카 (이산화규소)": silicaFumed,
  "산화하프늄 / 산화몰리브덴": hfoMoo,
  "사산화삼망간": mn3o4,
  "티탄산바륨": batio3,
  "수소화알루미늄리튬": lialh4,
  "마그네슘 비드/그레인": magnesium,
  "근청석 (Cordierite)": cordierite,
  "규산지르코늄": zrsio4,
  "산화마그네슘": magnesiumOxide,
};

export const getProductImage = (name: string) => PRODUCT_IMAGES[name];
