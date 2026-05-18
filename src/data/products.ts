export type ProductFeature = { title: string; points: string[] };
export type ProductAppSection = {
  title: string;
  intro?: string;
  rows: { use: string; role: string; note?: string }[];
};
export type ProductSizingTable = {
  title: string;
  intro?: string;
  headers: [string, string, string];
  rows: [string, string, string][];
};
export type ProductDetails = {
  features?: ProductFeature[];
  appSections?: ProductAppSection[];
  sizingTable?: ProductSizingTable;
};

export type Product = {
  name: string;
  cat: string;
  formula: string;
  desc: string;
  tags: string[];
  apps: string[];
  details?: ProductDetails;
};

export type CategoryKey =
  | "quartz"
  | "nano"
  | "battery"
  | "carbonates"
  | "fluorides"
  | "oxides"
  | "nitrides"
  | "carbides"
  | "hpa"
  | "corundum"
  | "metals"
  | "manganese"
  | "others"
  | "rareearth";

export type Category = {
  key: CategoryKey;
  kr: string;
  en: string;
  title: string;
  items: Product[];
};

// ──────────────── 공통 제품 정의 (이차전지에 미러링되는 항목들은 const로 분리) ────────────────

const PROD_Li2CO3: Product = {
  name: "탄산리튬 / Lithium Carbonate",
  cat: "탄산염",
  formula: "Li₂CO₃",
  desc: "탄산리튬(Li₂CO₃)은 리튬이온 이차전지 양극재(LCO·NCM·LFP·LMO) 원료 및 의약·유리 산업의 핵심 무기염입니다. 순도 99~99.99%(배터리·전자급) 등급으로 안정 생산되며, 백색 분말 형태로 균일한 입도와 낮은 자성 불순물(Fe, Cr, Ni)이 요구됩니다.",
  tags: ["배터리급", "양극재 전구체", "99.99%"],
  apps: [
    "리튬이온 배터리 양극재 (LCO·NCM·LFP·LMO)",
    "내열·내화학 유리·세라믹 유약",
    "의약품(조울증 치료제) 원료",
    "알루미늄 전해 제련 첨가제",
    "시멘트 응결 촉진제",
  ],
  details: {
    features: [
      { title: "고순도 정제 – 배터리급 품질", points: ["순도 99.0% / 99.5% / 99.9% / 99.99% 등급 제공", "자성 불순물(Fe·Cr·Ni·Zn) ppb 수준 관리"] },
      { title: "균일한 입도 분포", points: ["평균 입도 D50 5~15 µm 제어 가능", "양극재 합성 시 반응성과 균일성 동시 확보"] },
      { title: "낮은 수분·이산화탄소 흡습", points: ["밀폐 포장으로 흡습 최소화", "장기 보관 시에도 품질 유지"] },
      { title: "안정적 결정구조", points: ["단사정계(Monoclinic) 결정구조", "고온 소성 시 일정한 분해 거동"] },
    ],
    appSections: [
      { title: "🔋 리튬이온 배터리", intro: "양극재 합성의 핵심 리튬 소스로 가장 많이 사용됩니다.", rows: [
        { use: "LCO (LiCoO₂)", role: "리튬 소스", note: "모바일·소형 IT 디바이스" },
        { use: "NCM / NCA", role: "리튬 소스 + 결합제", note: "전기차·ESS 고에너지밀도" },
        { use: "LFP (LiFePO₄)", role: "리튬 소스", note: "고안전성 EV·ESS" },
        { use: "LMO (LiMn₂O₄)", role: "리튬 소스", note: "전동공구·전기버스" },
      ]},
      { title: "🏭 산업 및 의약", rows: [
        { use: "내열 유리 (Pyroceram)", role: "융제 + 열팽창 저감", note: "오븐웨어·내화 유리" },
        { use: "의약품 (조울증)", role: "API 원료" },
        { use: "알루미늄 제련", role: "전해질 첨가제", note: "에너지 소비 절감" },
      ]},
    ],
  },
};

const PROD_LiF: Product = {
  name: "불화리튬 / Lithium Fluoride",
  cat: "불화물",
  formula: "LiF",
  desc: "불화리튬(LiF)은 리튬이온 배터리 전해액 첨가제(LiPF₆ 합성 원료) 및 차세대 전고체 전지 SEI 형성층의 핵심 소재입니다. 99.0~99.99% 순도로 공급되며 광학(IR 윈도우)·세라믹 융제 용도로도 사용됩니다.",
  tags: ["배터리 전해액", "LiPF₆ 전구체", "99.99%"],
  apps: ["리튬 배터리 전해액(LiPF₆) 원료", "전고체 전지 SEI 안정화 첨가제", "IR 광학 윈도우", "세라믹 유약 융제", "방사선 선량계 (TLD)"],
  details: {
    features: [
      { title: "전기화학적 안정성", points: ["넓은 전기화학 윈도우(>5V vs Li/Li⁺)", "고전압 양극 소재와 호환"] },
      { title: "광학 투과성", points: ["진공 자외선(VUV) ~ 적외선(IR)까지 광범위 투과", "프리즘·렌즈·창 소재로 활용"] },
      { title: "고순도 제어", points: ["수분·SO₄·중금속 불순물 ppm 이하 관리", "배터리 grade 99.99%↑ 공급"] },
    ],
  },
};

const PROD_Mn3O4: Product = {
  name: "사산화삼망간 / Trimanganese Tetraoxide",
  cat: "산화물",
  formula: "Mn₃O₄",
  desc: "사산화삼망간(Mn₃O₄)은 리튬이온 배터리 양극재(LMFP·LNMO·LMO) 전구체 및 소프트 페라이트 자성 재료의 핵심 산화물입니다. 고순도 저자성 불순물 등급으로 안정 생산됩니다.",
  tags: ["배터리 전구체", "페라이트", "Mn₃O₄"],
  apps: ["LMFP / LNMO / LMO 배터리 양극재 전구체", "소프트 페라이트 자성 재료(MnZn 페라이트)", "유기물 분해 촉매", "PTC 서미스터 / NTC 센서"],
  details: {
    features: [
      { title: "고순도 망간 산화물", points: ["Mn 함량 70%↑, 저자성 불순물(Fe·Cr·Ni·Cu) 관리", "양극재 사이클 수명 향상"] },
      { title: "균일한 입자 분포", points: ["분말 입도 D50 1~10 µm 가능", "전구체 균일 합성"] },
      { title: "전기화학적 활성", points: ["Mn²⁺/Mn³⁺/Mn⁴⁺ 다중 산화 상태", "고전압·고용량 양극재에 적합"] },
    ],
  },
};

const PROD_Mn: Product = {
  name: "전해 망간 금속 플레이크 / Electrolytic Manganese Metal Flakes",
  cat: "전해 망간",
  formula: "Mn ≥99.8%",
  desc: "전해법으로 제조된 고순도(99.8%↑) 망간 금속 플레이크로, 한 면은 광택의 백색, 반대면은 청회색을 띠는 경질 취성 재료입니다. 합금 첨가제, 리튬망간계 배터리 소재(LMO·NCM), 특수 강재, 화학 환원제로 광범위 활용됩니다.",
  tags: ["99.8%↑", "배터리", "합금"],
  apps: [
    "리튬망간(LMO)·NCM 배터리 전구체",
    "고장력 강판·스테인리스 합금 첨가",
    "알루미늄 합금 탈산제",
    "특수 용접봉 피복재",
    "유기화학 환원제",
  ],
  details: {
    features: [
      { title: "순도 ≥ 99.8% – 초저 불순물", points: ["S·P·C·Se 등 강재 유해 원소 ppm 단위 관리", "고급 합금·배터리 전구체로 사용 가능"] },
      { title: "강한 항산화성", points: ["산화 피막 형성으로 보관 안정", "장기 운송에도 변색 최소"] },
      { title: "독특한 외관과 형태", points: ["한 면 광택·반대면 거친 표면", "경질 취성 플레이크 → 분쇄 시 은회색 분말"] },
      { title: "반도체적 특성", points: ["저전압 영역에서 반도체 거동", "전자/촉매 응용 가능"] },
    ],
    appSections: [
      { title: "⚙️ 합금 / 강재", rows: [
        { use: "고장력 강판(HSLA)", role: "강도·인성 향상" },
        { use: "스테인리스강", role: "오스테나이트 안정화", note: "Ni 일부 대체" },
        { use: "알루미늄 합금", role: "탈산제·결정 미세화" },
      ]},
      { title: "🔋 배터리", rows: [
        { use: "LMO (LiMn₂O₄)", role: "Mn 소스" },
        { use: "NCM 양극재", role: "Mn 함량 조절" },
        { use: "이차전지 전구체", role: "MnSO₄ → 전구체 합성" },
      ]},
    ],
  },
};

// ──────────────── 나노소재(SUOYI 카탈로그 기반) – 미러링용 공통 정의 ────────────────

const PROD_Nano_Al2O3_4N: Product = {
  name: "4N 나노 알루미나 / 4N Nano Alumina",
  cat: "나노소재",
  formula: "α/γ-Al₂O₃ 99.99%",
  desc: "순도 99.99%(4N) 나노 알루미나 분말. α상·γ상 결정구조로 입도 100~500 nm 제어가 가능하며, 리튬이온 배터리 분리막 코팅, LED 사파이어 잉곳, 형광체 호스트, 정밀 폴리싱 슬러리, 투명 세라믹의 핵심 소재입니다.",
  tags: ["4N 99.99%", "분리막 코팅", "α·γ상"],
  apps: [
    "리튬이온 배터리 분리막 세라믹 코팅(CCS)",
    "LED·LD 사파이어 잉곳 원료",
    "고급 형광체 호스트",
    "투명 세라믹·치과용 블록",
    "정밀 CMP/광학 폴리싱 슬러리",
  ],
  details: {
    features: [
      { title: "초저 금속 불순물", points: ["Na·K·Si·Fe·Ca 각 < 10 ppm", "배터리 안전성 강화"] },
      { title: "균일한 나노 입도", points: ["D50 100~500 nm 제어", "α상 결정성 우수, 분산성 양호"] },
      { title: "고온 안정성", points: ["융점 ~2,050°C, 모스경도 9", "단상 α-Al₂O₃ 전환 안정"] },
      { title: "다양한 결정상 옵션", points: ["γ상: 고비표면적 촉매 담체", "α상: 고밀도 소결·연마 슬러리"] },
    ],
    sizingTable: {
      title: "입자 크기별 추천 용도",
      intro: "4N 나노 알루미나의 입도(D50) 범위와 대표 적용 분야입니다.",
      headers: ["D50 (nm)", "주요 결정상", "대표 용도"],
      rows: [
        ["100 ~ 200", "γ-Al₂O₃", "촉매 담체, 흡착제"],
        ["200 ~ 500", "α-Al₂O₃", "분리막 코팅(CCS), 정밀 CMP 슬러리"],
        ["500 ~ 1,000", "α-Al₂O₃", "투명 세라믹, 사파이어 잉곳 원료"],
      ],
    },
  },
};

const PROD_Nano_Al2O3_5N: Product = {
  name: "5N 고순도 나노 알루미나 / 5N High Purity Nano Alumina",
  cat: "나노소재",
  formula: "α-Al₂O₃ 99.999%",
  desc: "순도 99.999%(5N) 초고순도 나노 α-알루미나. 마이크로 LED 기판, 단결정 사파이어 성장, OLED 박막 봉지(TFE) 보호층, 고출력 레이저 호스트, 차세대 반도체 공정용 초고순도 세라믹의 핵심 원료입니다.",
  tags: ["5N 99.999%", "마이크로 LED", "반도체급"],
  apps: ["마이크로 LED 기판", "단결정 사파이어 성장", "OLED 봉지 보호층", "고출력 레이저 호스트", "ALD/CVD용 알루미나 전구체 원료"],
  details: {
    features: [
      { title: "초고순도 5N (99.999%)", points: ["Na·K·Fe 각 < 1 ppm", "Si·Ca·Mg·Cu·Ni 각 ppb 수준 관리"] },
      { title: "고결정성 α상", points: ["1,200°C↑ 소성 α-Al₂O₃", "균일 입도·낮은 응집"] },
    ],
  },
};

const PROD_Nano_Al2O3_Disp: Product = {
  name: "나노 알루미나 분산액 / Nano Alumina Dispersion",
  cat: "나노소재",
  formula: "Al₂O₃ Dispersion",
  desc: "수계·용제계 나노 알루미나 분산액(고형분 20~40%). 평균 입도 50~200 nm로 안정 분산되어 코팅 첨가제, CMP 슬러리, 잉크젯 잉크, 분리막 코팅, 광학 하드코팅에 즉시 사용 가능한 형태로 공급됩니다.",
  tags: ["분산액", "20~40% 고형분", "코팅용"],
  apps: ["분리막 세라믹 코팅 슬러리", "CMP·광학 폴리싱 슬러리", "하드코트·반사방지 코팅", "잉크젯·기능성 잉크", "투명 도전성 필름"],
};

const PROD_Nano_TiO2: Product = {
  name: "나노 이산화티타늄 / Nano Titanium Dioxide",
  cat: "나노소재",
  formula: "TiO₂ (Anatase / Rutile)",
  desc: "고광촉매·고은폐력 나노 TiO₂ 분말. 결정상(Anatase·Rutile)과 입도(10~100 nm)를 용도별로 선택할 수 있으며, 광촉매 항균·셀프클리닝, 자외선 차단(선스크린·코팅), DSSC 태양전지, 백색 안료 등에 광범위 사용됩니다.",
  tags: ["광촉매", "UV 차단", "Anatase·Rutile"],
  apps: ["광촉매 항균·셀프클리닝 코팅", "자외선 차단 화장품·코팅", "염료감응 태양전지(DSSC)", "고급 백색 안료", "공기·수처리 정화재"],
  details: {
    features: [
      { title: "결정상 선택", points: ["Anatase: 고광촉매 활성", "Rutile: 고굴절·UV 차단·내후성"] },
      { title: "초미세 나노 입도", points: ["D50 10~100 nm 제어", "고분산·고은폐력"] },
      { title: "표면 처리 옵션", points: ["실리카·알루미나 코팅 가능", "화장품·수지용 친유 표면처리"] },
    ],
  },
};

const PROD_Nano_TiO2_Disp: Product = {
  name: "나노 이산화티타늄 분산액 / Nano TiO₂ Dispersion",
  cat: "나노소재",
  formula: "TiO₂ Dispersion",
  desc: "수계·알코올계 나노 TiO₂ 분산액(고형분 10~30%). 항균·셀프클리닝 코팅, 광촉매 도료, 자외선 차단 화장품 베이스, 투명 단열 필름 등에 즉시 적용 가능한 안정 분산 제품입니다.",
  tags: ["분산액", "광촉매", "UV"],
  apps: ["광촉매 셀프클리닝 도료", "투명 자외선 차단 필름", "항균 코팅 첨가제", "DSSC 페이스트", "기능성 화장품 베이스"],
};

const PROD_Nano_ZrO2: Product = {
  name: "나노 지르코니아 / Nano Zirconia",
  cat: "나노소재",
  formula: "ZrO₂ / YSZ",
  desc: "고강도·고인성 나노 지르코니아 분말(순수 ZrO₂ 및 이트리아 안정화 YSZ). 입도 50~200 nm로 치과용 블록, 정밀 세라믹, 산소센서, 고체산화물 연료전지(SOFC) 전해질, 정밀 폴리싱 슬러리 원료로 사용됩니다.",
  tags: ["치과", "SOFC", "YSZ"],
  apps: ["치과 크라운·임플란트 블록", "정밀 세라믹 부품·페룰", "산소센서·SOFC 전해질", "정밀 CMP 폴리싱 슬러리", "내마모 코팅"],
  details: {
    features: [
      { title: "변형강화 인성", points: ["t→m 상전이 균열 억제", "파괴인성 6~10 MPa·m¹/²"] },
      { title: "나노 입도", points: ["D50 50~200 nm", "고소결성·고치밀도"] },
    ],
  },
};

const PROD_Nano_ZrO2_Disp: Product = {
  name: "나노 지르코니아 분산액 / Nano Zirconia Dispersion",
  cat: "나노소재",
  formula: "ZrO₂ Dispersion",
  desc: "수계·용제계 나노 지르코니아 분산액. 정밀 폴리싱 슬러리, 고굴절 광학 코팅, 세라믹 잉크, 치과용 슬러리 등 고기능 응용을 위한 안정 분산형 제품입니다.",
  tags: ["분산액", "광학", "폴리싱"],
  apps: ["정밀 폴리싱 슬러리", "고굴절 광학 코팅", "치과용 3D 프린팅 슬러리", "세라믹 잉크젯 잉크"],
};

const PROD_Nano_SiO2: Product = {
  name: "나노 실리카 / Nano Silica",
  cat: "나노소재",
  formula: "SiO₂",
  desc: "기상법·졸겔법으로 제조된 나노 실리카(SiO₂) 분말. 비표면적이 매우 크고 표면 실라놀기(Si-OH)가 풍부하여 고분자 보강, 요변·침강방지, 방열 필러, 화장품, CMP 슬러리, 단열재(VIP) 심재 등 광범위 응용에 적합합니다.",
  tags: ["나노", "보강", "CMP"],
  apps: ["고분자 보강·요변제", "정밀 반도체 CMP 슬러리", "방열·단열 필러(VIP)", "화장품·치약 흡유제", "광학·하드코트 첨가제"],
  details: {
    features: [
      { title: "초미세 1차 입자", points: ["7~50 nm", "BET 50~400 m²/g"] },
      { title: "표면 개질 옵션", points: ["친수성·친유성(HMDS·실란 처리)", "용제·수지 호환성 향상"] },
    ],
  },
};

const PROD_Nano_ZnO: Product = {
  name: "나노 산화아연 / Nano Zinc Oxide",
  cat: "나노소재",
  formula: "ZnO",
  desc: "나노 산화아연(ZnO) 분말. 자외선 차단(UV-A·UV-B 광범위 흡수), 항균, 광촉매, 고무 가황 활성제, 투명 도전막(TCO)용 ZnO/AZO 원료로 사용됩니다. 입도 20~100 nm 제어 가능.",
  tags: ["UV 차단", "항균", "TCO"],
  apps: ["자외선 차단 화장품·코팅", "항균·소취 도료·섬유", "고무 가황 활성제", "투명 도전막(AZO) 원료", "광촉매·가스센서"],
  details: {
    features: [
      { title: "광범위 UV 차단", points: ["UV-A·UV-B 동시 차폐", "투명성 우수(가시광 투과)"] },
      { title: "항균·소취 활성", points: ["대장균·황색포도상구균 99%↑ 항균", "광촉매 활성 부여"] },
    ],
  },
};

const PROD_Nano_MgO: Product = {
  name: "나노 산화/수산화 마그네슘 / Nano MgO & Mg(OH)₂",
  cat: "나노소재",
  formula: "MgO / Mg(OH)₂",
  desc: "고비표면적 나노 산화마그네슘(MgO) 및 수산화마그네슘(Mg(OH)₂) 분말. 친환경 무할로겐 난연제, 산성 가스 흡착·중화, 고온 절연재, 전선 절연 보호막, 첨단 세라믹 소결 조제로 사용됩니다.",
  tags: ["난연", "흡착", "절연"],
  apps: ["무할로겐 친환경 난연제(케이블·플라스틱)", "산성 가스·VOC 흡착제", "전선·전자부품 절연재", "PDP 보호막", "고온 세라믹 소결 조제"],
};

const PROD_Nano_Ag: Product = {
  name: "나노 실버 항균제 / Nano Silver Anti-bacterial",
  cat: "나노소재",
  formula: "Ag",
  desc: "나노 실버(Ag) 분말 및 분산액. 광범위 항균·항바이러스 활성(99.9%↑)으로 의료기기, 항균 섬유·필터, 식품 포장, 도전성 잉크, 전자기기 코팅에 사용됩니다. 입도 20~100 nm.",
  tags: ["항균 99.9%", "도전성", "Ag"],
  apps: ["의료·위생용 항균 코팅", "항균 섬유·마스크·필터", "도전성 잉크·페이스트", "투명 전극(터치 패널)", "식품 포장 항균 필름"],
  details: {
    features: [
      { title: "광범위 항균·항바이러스", points: ["대장균·황색포도상구균 99.9%↑", "곰팡이·바이러스 억제"] },
      { title: "고전도성", points: ["인쇄전자·도전성 잉크 적용", "저온 소결 가능"] },
    ],
  },
};

const PROD_Nano_ATO: Product = {
  name: "나노 ATO (안티몬 도핑 산화주석) / Nano ATO",
  cat: "나노소재",
  formula: "Sb-SnO₂",
  desc: "안티몬 도핑 산화주석(ATO) 나노 분말 및 분산액. 높은 적외선(IR) 차단 성능과 전기 전도성을 동시에 제공하여 차열 유리·필름, 투명 발열체, 정전기 방지 코팅, 투명 전극에 사용됩니다.",
  tags: ["IR 차단", "투명 전도", "차열"],
  apps: ["건축·자동차 차열 유리·필름", "투명 발열체(LFH)", "정전기 방지(ESD) 코팅", "투명 전극·디스플레이 코팅"],
};

const PROD_Nano_RareEarth: Product = {
  name: "나노 희토류 산화물 시리즈 / Nano Rare-Earth Oxide Series",
  cat: "나노소재",
  formula: "CeO₂ · La₂O₃ · Nd₂O₃ · Pr₆O₁₁ · Gd₂O₃ · Sm₂O₃",
  desc: "나노 희토류 산화물 시리즈. 산화세륨(CeO₂)·산화란탄(La₂O₃)·산화네오디뮴(Nd₂O₃) 등 고순도(99.9%↑) 나노 분말을 50~200 nm 입도로 공급합니다. 자동차 촉매, 정밀 폴리싱, 형광체, 자성 재료, 고굴절 광학 유리의 핵심 첨가제입니다.",
  tags: ["CeO₂", "촉매", "폴리싱", "99.9%↑"],
  apps: ["자동차 배기가스 3원 촉매(CeO₂)", "유리·반도체 CMP 폴리싱(CeO₂)", "형광체·레이저 호스트(Nd₂O₃·Gd₂O₃)", "고굴절 광학 유리(La₂O₃)", "고온 초전도체·자성 재료"],
  details: {
    features: [
      { title: "고순도 99.9% 이상", points: ["타 희토류 교차오염 < 100 ppm", "용도별 단일 산화물 공급"] },
      { title: "균일 나노 입도", points: ["D50 50~200 nm 제어", "분산성·반응성 우수"] },
    ],
    appSections: [
      { title: "🚗 촉매 (Catalysts)", rows: [
        { use: "자동차 배기가스 3원 촉매", role: "산소 저장체(OSC) – CeO₂", note: "CO·HC·NOx 동시 저감" },
        { use: "VOC 산화 촉매", role: "활성 산소 공급체" },
      ]},
      { title: "💎 폴리싱 (Polishing)", rows: [
        { use: "디스플레이 유리 CMP", role: "CeO₂ 폴리싱 슬러리", note: "표면조도 < Å" },
        { use: "반도체 STI CMP", role: "CeO₂ 슬러리", note: "산화막 평탄화" },
      ]},
      { title: "📡 형광·자성·광학", rows: [
        { use: "형광체 호스트", role: "Eu·Tb 도핑 모체" },
        { use: "고굴절 광학 유리", role: "La₂O₃ 첨가제" },
        { use: "Nd-YAG 레이저", role: "Nd₂O₃ 활성 이온" },
      ]},
    ],
  },
};

const PROD_Nano_IronOxide: Product = {
  name: "나노 산화철 (Fe₃O₄ / Fe₂O₃) / Nano Iron Oxide",
  cat: "나노소재",
  formula: "Fe₃O₄ · α-Fe₂O₃",
  desc: "나노 사산화삼철(Fe₃O₄, 자성)과 산화제이철(α-Fe₂O₃, 적색) 분말. MRI 조영제, 자성 유체, 자기 분리, 리튬-철 배터리 전구체, 전자파 흡수재, 고급 적색 안료 등 광범위 응용에 사용됩니다.",
  tags: ["자성", "MRI", "안료"],
  apps: ["MRI 조영제·표적 약물전달", "자성 유체·자기 분리", "전자파 흡수(EMI) 소재", "리튬-철 배터리 전구체", "고급 적색 안료·페라이트"],
  details: {
    features: [
      { title: "초상자성(Fe₃O₄)", points: ["10~30 nm 단일자구", "MRI·자기분리 응용"] },
      { title: "고채도 적색(α-Fe₂O₃)", points: ["내광·내후 안료", "도료·화장품·세라믹 안료"] },
    ],
  },
};

const PROD_Nano_PolishingPowder: Product = {
  name: "나노 폴리싱 파우더 시리즈 / Nano Polishing Powder Series",
  cat: "나노소재",
  formula: "CeO₂ · Al₂O₃ · ZrO₂ · SiO₂ · Diamond",
  desc: "고정밀 폴리싱용 나노 세라믹 파우더 시리즈. CeO₂(유리·실리콘 CMP), α-Al₂O₃(하드디스크·금속), ZrO₂(광학), 콜로이달 실리카(웨이퍼 최종 CMP), 나노 다이아몬드(초경) 등 용도별 입도(30~500 nm) 최적 제품을 공급합니다.",
  tags: ["CMP", "정밀 폴리싱", "30~500 nm"],
  apps: ["반도체 웨이퍼 CMP", "LCD·OLED 유리 폴리싱", "보석·렌즈 광학 폴리싱", "하드디스크 표면 폴리싱", "정밀 금형·금속 미세연마"],
  
  details: {
    sizingTable: {
      title: "재료별 권장 입도 / 용도",
      intro: "각 폴리싱 파우더의 입도(D50)와 대표 적용 분야입니다.",
      headers: ["재료", "D50 (nm)", "대표 용도"],
      rows: [
        ["CeO₂ (세리아)", "100 ~ 500", "디스플레이 유리·반도체 STI CMP"],
        ["α-Al₂O₃", "200 ~ 500", "하드디스크·사파이어·금속 폴리싱"],
        ["콜로이달 SiO₂", "30 ~ 100", "실리콘 웨이퍼 최종 CMP"],
        ["ZrO₂", "100 ~ 300", "광학 부품·정밀 세라믹 폴리싱"],
        ["나노 다이아몬드", "30 ~ 200", "초경합금·보석·정밀 광학"],
      ],
    },
  },
};

const PROD_Nano_PolishingLiquid: Product = {
  name: "나노 폴리싱 슬러리 시리즈 / Nano Polishing Liquid (Slurry) Series",
  cat: "나노소재",
  formula: "CMP Slurry",
  desc: "수계 나노 폴리싱 슬러리(CMP). CeO₂·콜로이달 SiO₂·α-Al₂O₃ 입자를 안정 분산시킨 즉시 사용형 슬러리로, 반도체 웨이퍼·디스플레이 유리·광학 부품의 초정밀 평탄화 가공에 사용됩니다.",
  tags: ["CMP 슬러리", "즉시 사용형"],
  apps: ["반도체 웨이퍼 CMP", "LCD·OLED 유리 정밀 폴리싱", "광학 렌즈·프리즘 폴리싱", "사파이어·세라믹 기판 폴리싱"],
};

// ──────────────── 카테고리 정의 ────────────────


export const CATEGORIES: Category[] = [
  // 1. 용융실리카 (유지)
  {
    key: "quartz",
    kr: "용융실리카",
    en: "Fused Silica",
    title: "용융실리카 / Fused Silica",
    items: [
      {
        name: "용융석영 A등급 / Fused Quartz Grade A",
        cat: "용융석영",
        formula: "SiO₂",
        desc: "SiO₂ >99.9%, 최고 순도 등급. 정밀 광학 부품 및 반도체 소재.",
        tags: ["SiO₂ 99.9%↑", "광학"],
        apps: ["초정밀 광학 유리 부품", "반도체 봉지재(EMC) 첨가제", "광통신 케이블 소재", "정밀 도가니"],
        details: {
          features: [
            { title: "초고순도 – 반도체 공정에 안전", points: ["주요 금속 불순물(Al, Fe, Na, K, Ca, Mg) 각각 0.01% 미만", "웨이퍼 오염 위험을 최소화하여 고집적 반도체 공정 수율 향상"] },
            { title: "초저열팽창 – 극한 온도 환경에 강함", points: ["열팽창계수 0.6 ×10⁻⁶/°C 미만 (일반 유리 대비 15배 이상 낮음)", "급격한 가열/냉각에도 균열 및 광학 왜곡 거의 없음"] },
            { title: "완전 무정형 – 균일한 광학 성능", points: ["100% 무정형상(Amorphous)으로 빛의 산란 없음", "UV부터 IR까지 넓은 파장대에서 높은 투과율"] },
            { title: "전기적·화학적 안정성", points: ["초고절연(EC < 3 µs/cm), 초저염소(Cl < 3 ppm), 중성(pH 6.5)", "부식 위험이 낮아 장비 수명 연장 및 공정 안정성 확보"] },
            { title: "높은 내마모성", points: ["모스경도 7 (일반 유리 5.5 대비 높음)", "표면 스크래치에 강하고 정밀 가공 시 날카로운 모서리 구현 가능"] },
          ],
        },
      },
      {
        name: "용융석영 B등급 / Fused Quartz Grade B",
        cat: "용융석영",
        formula: "SiO₂",
        desc: "SiO₂ >99.5%, 열진동 안정성 우수. 산업 전반에 폭넓게 적용.",
        tags: ["SiO₂ 99.5%↑", "내화물"],
        apps: ["고급 내화물", "전기 절연 부품", "정밀 주조 몰드", "내열 세라믹 기판"],
        details: {
          features: [
            { title: "고순도 정제 – 안정적인 품질", points: ["SiO₂ 순도 99.5% 이상", "A등급(99.9%) 대비 경제적인 가격으로 일반 산업에 적합"] },
            { title: "저철분 관리 – 착색 및 오염 최소화", points: ["Fe(철) 함량 0.02% 미만", "내화재·코팅·세라믹 원료 사용 시 철 성분으로 인한 변색이나 오염 방지"] },
            { title: "우수한 내열충격성", points: ["열팽창계수 0.8 ×10⁻⁶/°C 미만", "급격한 온도 변화에도 균열 발생이 적어 고온 공정·내화재·주조용 몰드에 적합"] },
            { title: "98% 이상 무정형상", points: ["결정질 석영 대비 열 충격에 강하고 가공성 우수", "균일한 열 팽창 특성 제공"] },
            { title: "화학적 안정성", points: ["알칼리 금속(Na, K) 함량 각각 0.01% 미만", "고온 환경에서 화학적 반응성을 낮춰 내구성 확보"] },
          ],
        },
      },
      {
        name: "용융석영 C등급 / Fused Quartz Grade C",
        cat: "용융석영",
        formula: "SiO₂",
        desc: "SiO₂ >99%, 비결정형 99%↑. 코팅 및 내화재용 범용 등급.",
        tags: ["SiO₂ 99%↑", "범용"],
        apps: ["범용 도료 첨가제", "건축용 내화 캐스터블", "플라스틱/고무 충전재", "주조용 모래"],
        details: {
          features: [
            { title: "경제적인 가격 – 대량 사용에 적합", points: ["SiO₂ 순도 99% 이상으로 산업용 기준 충분", "A/B등급 대비 원가 절감으로 대량 수요에 최적화"] },
            { title: "안정적인 내열충격성", points: ["열팽창계수 1.2 ×10⁻⁶/°C 미만", "급격한 온도 변화에도 균열 발생 억제", "고온 공정(최대 1,000℃)에서 안정적 사용 가능"] },
            { title: "우수한 내마모성", points: ["모스경도 7 (일반 광물 대비 높은 경도)", "분말 형태로 사용 시 내마모성 충전재 역할"] },
            { title: "95% 이상 무정형상", points: ["결정질 석영 대비 열 충격 저항성 우수", "균일한 열팽창 특성 제공"] },
            { title: "건조 관리로 장기 보관 가능", points: ["수분 함량 0.1% 미만 유지", "흡습 방지 포장으로 품질 일관성 확보"] },
          ],
        },
      },
      {
        name: "용융 실리카 분말 / Fused Silica Powder",
        cat: "실리카 분말",
        formula: "SiO₂",
        desc: "75μm~1μm 초미세 분말. 낮은 유전손실·우수한 전기절연성.",
        tags: ["초미세", "반도체"],
        apps: ["PCB 동박적층판(CCL)", "고급 에폭시 수지 첨가제", "반도체 패키징 필러", "특수 코팅재"],
        details: {
          appSections: [
            { title: "내화재 (Refractories)", rows: [
              { use: "고온로 내화 벽돌", role: "고온 내구성, 열충격 저항성 향상" },
              { use: "캐스터블 (Castable)", role: "결합재와 혼합하여 고온 내화물 제작" },
              { use: "로의 내화 라이닝", role: "열팽창 최소화, 균열 방지" },
              { use: "단열재", role: "낮은 열전도율로 단열 성능 제공" },
            ]},
            { title: "정밀 주조 (Investment Casting)", rows: [
              { use: "셸 몰드 (Shell Mold)", role: "내열성, 치수 안정성 확보" },
              { use: "세라믹 코어", role: "복잡한 내부 형상 제작 가능" },
              { use: "주조용 코팅제", role: "금형과 용융 금속 사이 이형 및 단열" },
            ]},
            { title: "산업용 코팅 (Industrial Coatings)", rows: [
              { use: "내열 페인트", role: "고온에서도 벗겨지지 않는 코팅층 형성" },
              { use: "방청 코팅", role: "수분 및 화학물질 차단" },
              { use: "세라믹 코팅", role: "내마모성, 내화학성 부여" },
            ]},
            { title: "전자·반도체 소재 (Electronics & Semiconductors)", rows: [
              { use: "반도체 봉지재 (EMC)", role: "열팽창 계수 매칭, 절연성 향상" },
              { use: "회로 기판 충전재", role: "저유전율, 저열팽창 특성 제공" },
              { use: "방열 소재", role: "높은 열전도율로 방열 성능 개선" },
            ]},
            { title: "고분자 복합재 (Polymer Composites)", rows: [
              { use: "엔지니어링 플라스틱", role: "내열성, 내마모성, 치수 안정성 향상" },
              { use: "접착제 / 실란트", role: "충전재로 점도 조절, 열팽창 저감" },
              { use: "방열 시트", role: "열전도성 필러로 사용" },
            ]},
            { title: "연마재 및 표면 처리 (Abrasives & Surface Treatment)", rows: [
              { use: "샌드블라스팅", role: "금속 표면의 녹, 페인트 제거" },
              { use: "연마제", role: "유리, 금속, 세라믹 표면 연마" },
              { use: "워터젯 절단용 입자", role: "절단 효율 향상" },
            ]},
            { title: "건축 및 토목 (Construction & Civil Engineering)", rows: [
              { use: "고강도 콘크리트", role: "내화성, 내구성 향상" },
              { use: "내열 모르타르", role: "고온 환경용 접착 및 보수" },
              { use: "그라우트재", role: "균열 방지, 수축 저감" },
            ]},
          ],
          sizingTable: {
            title: "입자 크기별 용도",
            intro: "용융실리카 분말은 입자 크기(메시, Mesh)에 따라 사용처가 완전히 달라집니다.",
            headers: ["입도 (Mesh)", "평균 입자 크기", "대표 용도"],
            rows: [
              ["#30 ~ #100", "150 ~ 500µm", "샌드블라스팅, 필터 매체, 중간 충전재"],
              ["#100 ~ #200", "75 ~ 150µm", "주조 몰드, 내화 캐스터블, 코팅용 골재"],
              ["#200 ~ #325", "45 ~ 75µm", "접착제, 실란트, 고분자 충전재"],
              ["#325 ~ #400", "37 ~ 45µm", "세라믹 원료, 정밀 충전재, 봉지재"],
              ["#400 미만 (미분말)", "< 37µm", "반도체 봉지재, 방열 소재, 고성능 코팅"],
            ],
          },
        },
      },
      { name: "용융석영사 A·B·C / Fused Quartz Sand A·B·C", cat: "용융석영사", formula: "SiO₂", desc: "60~0.075mm 규격 과립·석영사. 정밀주조 및 내화 캐스터블.", tags: ["석영사", "주조"], apps: ["석영 도가니 제조", "정밀 주조용 쉘 몰드", "내산성 콘크리트 첨가제", "고온로 단열재"] },
    ],
  },

  // 2. 나노소재 (Nano Materials)
  {
    key: "nano",
    kr: "나노소재",
    en: "Nano Materials",
    title: "나노소재 / Nano Materials",
    items: [
      PROD_Nano_Al2O3_4N,
      PROD_Nano_Al2O3_5N,
      PROD_Nano_Al2O3_Disp,
      PROD_Nano_TiO2,
      PROD_Nano_TiO2_Disp,
      PROD_Nano_ZrO2,
      PROD_Nano_ZrO2_Disp,
      PROD_Nano_SiO2,
      PROD_Nano_ZnO,
      PROD_Nano_MgO,
      PROD_Nano_Ag,
      PROD_Nano_ATO,
      PROD_Nano_RareEarth,
      PROD_Nano_IronOxide,
      PROD_Nano_PolishingPowder,
      PROD_Nano_PolishingLiquid,
    ],
  },

  // 이차전지는 아래(마지막)로 이동되었습니다.




  // 3. 탄산염
  {
    key: "carbonates",
    kr: "탄산염",
    en: "Carbonates",
    title: "탄산염 / Carbonates",
    items: [
      {
        name: "탄산스트론튬 / Strontium Carbonate",
        cat: "탄산염",
        formula: "SrCO₃",
        desc: "탄산스트론튬(SrCO₃)은 페라이트 자석, 컬러 TV 음극선관(CRT) 유리, 적색 불꽃, 도자기 유약 등에 사용되는 백색 분말입니다. 순도 80~99.9% 등급으로 공급됩니다.",
        tags: ["페라이트", "유리", "80~99.9%"],
        apps: ["페라이트 영구자석", "특수 광학·전자 유리", "도자기 유약·세라믹 안료", "적색 불꽃·신호탄", "PTC 서미스터"],
        details: {
          features: [
            { title: "고순도 백색 분말", points: ["SrO 환산 함량 ≥ 69%", "철·Ba 등 색상 영향 불순물 관리"] },
            { title: "안정한 결정 구조", points: ["사방정계 결정", "850°C 이상에서 SrO로 분해 후 반응"] },
          ],
        },
      },
      {
        name: "경질 탄산마그네슘 / Light Magnesium Carbonate",
        cat: "탄산염",
        formula: "MgCO₃",
        desc: "경질 탄산마그네슘은 낮은 겉보기 밀도와 큰 비표면적을 가진 백색 분말로, 고무 가황 보강제, 의약품 제산제, 화장품 흡유제 등에 사용됩니다.",
        tags: ["고무", "의약", "화장품"],
        apps: ["고무 보강·충전재", "의약품 제산제·완하제", "치약·화장품 흡유제", "고급 인쇄잉크·잠열재"],
        details: {
          features: [
            { title: "낮은 겉보기 밀도", points: ["벌크밀도 0.1~0.3 g/cm³", "고무 보강 효과 우수"] },
            { title: "고흡유성·큰 비표면적", points: ["BET 비표면적 큼", "화장품·치약 흡유 기능"] },
          ],
        },
      },
      {
        name: "중질 탄산마그네슘 / Heavy Magnesium Carbonate",
        cat: "탄산염",
        formula: "MgCO₃",
        desc: "중질 탄산마그네슘은 입자가 크고 밀도가 높은 백색 분말로, 내화재·세라믹·플라스틱 충전재 등에 활용됩니다.",
        tags: ["내화", "세라믹"],
        apps: ["내화벽돌·내화재 원료", "세라믹·유리 융제", "플라스틱·고무 충전재", "사료·비료 첨가제"],
      },
      {
        name: "경질 탄산바륨 / Light Barium Carbonate",
        cat: "탄산염",
        formula: "BaCO₃",
        desc: "경질 탄산바륨은 광학 유리, 페라이트, 도자기 유약, 벽돌 백화 방지제 등에 사용되는 고순도 백색 분말입니다.",
        tags: ["페라이트", "광학유리"],
        apps: ["광학·전자 유리", "Ba 페라이트 자석", "도자기 유약", "방사선 차폐 콘크리트", "벽돌 백화 방지"],
      },
      {
        name: "중질 탄산바륨 / Heavy Barium Carbonate",
        cat: "탄산염",
        formula: "BaCO₃",
        desc: "중질 탄산바륨은 입도가 균일하고 밀도가 높은 백색 분말로, 광학 유리·세라믹·산업 화학 분야에 사용됩니다.",
        tags: ["광학유리", "산업화학"],
        apps: ["광학 유리·CRT 유리", "도자기 유약", "BaCl₂·Ba(OH)₂ 등 바륨염 원료", "정유·화학 촉매"],
      },
      {
        name: "탄산칼슘 / Calcium Carbonate",
        cat: "탄산염",
        formula: "CaCO₃",
        desc: "탄산칼슘(CaCO₃)은 건축·제지·플라스틱·고무·식품·제약 등 모든 산업에서 가장 광범위하게 사용되는 백색 무기 충전재입니다. 80~99.99% 다양한 순도와 다양한 입도(GCC·PCC)로 공급됩니다.",
        tags: ["충전재", "GCC·PCC", "80~99.99%"],
        apps: ["제지 충전·코팅", "플라스틱·고무 충전재", "건축 자재·페인트", "식품·제약(칼슘 보충제)", "환경(탈황·중화제)"],
        details: {
          features: [
            { title: "광범위 등급 제공", points: ["중질(GCC)·경질(PCC) 모두 공급", "순도 80~99.99% 선택 가능"] },
            { title: "입도 제어", points: ["1 µm 이하 나노급부터 수십 µm까지", "용도별 최적 입도 매칭"] },
          ],
        },
      },
      PROD_Li2CO3,
    ],
  },

  // 4. 불화물
  {
    key: "fluorides",
    kr: "불화물",
    en: "Fluorides",
    title: "불화물 / Fluorides",
    items: [
      {
        name: "형석 분말 / Fluorite Powder",
        cat: "불화물",
        formula: "CaF₂",
        desc: "형석(CaF₂) 분말은 제강·알루미늄 제련의 융제(Flux), HF·불화알루미늄 등 화학 원료, 광학 렌즈, 세라믹 유약 등에 사용되는 핵심 불화물 원료입니다. 순도 80~99.99% 등급으로 공급됩니다.",
        tags: ["제강 융제", "HF 원료", "80~99.99%"],
        apps: ["제강·알루미늄 융제(Flux)", "HF·AlF₃·CaF₂ 화학 합성", "광학·증착 코팅 원료", "세라믹 유약·법랑", "용접봉 피복재"],
      },
      {
        name: "고순도 불화칼슘 / High Purity Calcium Fluoride",
        cat: "불화물",
        formula: "CaF₂ 99.99%↑",
        desc: "광학·반도체급(99.99%↑) 고순도 불화칼슘. 자외선~적외선까지 넓은 투과 범위로 광학 렌즈, 엑시머 레이저 윈도우, 반도체 식각 가스 원료로 활용됩니다.",
        tags: ["광학급", "99.99%↑"],
        apps: ["엑시머 레이저(DUV) 광학", "고급 카메라·천체 망원경 렌즈", "반도체 식각 가스(SF₆·CF₄) 원료", "신틸레이터(방사선 검출기)"],
        details: {
          features: [
            { title: "초고순도 광학급", points: ["순도 99.99%↑, 금속 불순물 ppm 이하", "DUV·VUV 광학에 적합"] },
            { title: "광범위 투과 파장", points: ["0.13 ~ 10 µm 광범위 투과", "굴절률 안정"] },
          ],
        },
      },
      PROD_LiF,
    ],
  },

  // 5. 산화물
  {
    key: "oxides",
    kr: "산화물",
    en: "Oxides",
    title: "산화물 / Oxides",
    items: [
      {
        name: "흄드 실리카 / Fumed Silica (SiO₂)",
        cat: "산화물",
        formula: "SiO₂",
        desc: "기상법으로 제조된 초미세 비결정질 실리카로, 비표면적이 매우 크고 흡습·요변·보강 효과가 뛰어나 실리콘 고무, 도료, 접착제, 화장품에 광범위 사용됩니다.",
        tags: ["나노", "요변제", "보강제"],
        apps: ["실리콘 고무 보강재", "도료·잉크 요변·침강방지제", "접착제·실란트 점도 조절", "화장품·치약 흡유제", "VIP 진공 단열재 심재"],
        details: {
          features: [
            { title: "초미세 1차 입자", points: ["7~40 nm 1차 입자", "BET 50~400 m²/g"] },
            { title: "강력한 요변성", points: ["수소결합 네트워크 형성", "도료·실란트 처짐 방지"] },
          ],
        },
      },
      {
        name: "침전 실리카 / Precipitated Silica",
        cat: "산화물",
        formula: "SiO₂",
        desc: "침전법으로 제조된 백색 다공성 실리카로, 그린타이어 트레드, 사료 항결착제, 치약 연마제 등 친환경·기능성 첨가제로 사용됩니다.",
        tags: ["그린타이어", "친환경"],
        apps: ["저연비(그린) 타이어 트레드", "사료·식품 항결착제", "치약 연마제", "신발 밑창·고무 보강"],
      },
      {
        name: "산화하프늄 / Hafnium Oxide",
        cat: "산화물",
        formula: "HfO₂",
        desc: "산화하프늄(HfO₂)은 차세대 반도체 High-K 게이트 절연막의 핵심 소재이며, 광학 코팅과 원자력 산업에도 사용됩니다. 99~99.99% 등급으로 공급됩니다.",
        tags: ["반도체", "High-K", "99.99%"],
        apps: ["DRAM·로직 반도체 High-K 게이트", "광학 다층막 코팅(고굴절층)", "원자력 제어봉", "내열·내방사 세라믹"],
        details: {
          features: [
            { title: "High-K 유전체", points: ["유전상수 ~25 (SiO₂의 6배)", "10nm 이하 공정 표준 절연막"] },
            { title: "초고온 안정성", points: ["융점 2,758°C", "단사정→정방정→입방정 상전이"] },
          ],
        },
      },
      {
        name: "사염화하프늄 / Hafnium Tetrachloride",
        cat: "산화물",
        formula: "HfCl₄",
        desc: "ALD(원자층 증착)용 하프늄 전구체. 반도체 High-K 박막 증착의 핵심 화학 원료입니다.",
        tags: ["ALD 전구체", "반도체"],
        apps: ["반도체 ALD/CVD 전구체", "HfO₂ 박막 증착", "유기금속 합성 출발물질"],
      },
      PROD_Mn3O4,
      {
        name: "삼산화몰리브덴 / Molybdenum Trioxide",
        cat: "산화물",
        formula: "MoO₃",
        desc: "삼산화몰리브덴(MoO₃)은 석유 정제 탈황 촉매, 안료, OLED 정공수송층, 강철 합금 원료 등에 사용되는 다용도 산화물입니다.",
        tags: ["촉매", "OLED", "합금"],
        apps: ["석유 정제 HDS 촉매", "OLED 정공주입층(HIL)", "안료·도료(몰리브덴 오렌지)", "스테인리스·공구강 합금"],
      },
      {
        name: "산화마그네슘 / Magnesium Oxide",
        cat: "산화물",
        formula: "MgO (99.9%)",
        desc: "고순도(99.9%) 산화마그네슘은 약 2,800°C의 초고융점을 가진 백색 분말로 내화물·세라믹·의약·환경·전자 등 광범위하게 활용됩니다.",
        tags: ["고순도", "내화", "다용도"],
        apps: ["내화벽돌·도가니·노 라이닝", "제산제·완하제·Mg 보충제", "마그네시아 시멘트", "산성 폐수·배연 중화", "전선 절연재·PDP 보호막"],
      },
      // 나노소재 미러링
      PROD_Nano_SiO2,
      PROD_Nano_TiO2,
      PROD_Nano_TiO2_Disp,
      PROD_Nano_ZrO2,
      PROD_Nano_ZrO2_Disp,
      PROD_Nano_ZnO,
      PROD_Nano_MgO,
      PROD_Nano_ATO,
      PROD_Nano_IronOxide,
    ],
  },

  // 6. 질화물
  {
    key: "nitrides",
    kr: "질화물",
    en: "Nitrides",
    title: "질화물 / Nitrides",
    items: [
      {
        name: "질화알루미늄 / Aluminum Nitride (AlN)",
        cat: "질화물",
        formula: "AlN",
        desc: "질화알루미늄(AlN)은 우수한 열전도율(170~230 W/m·K)과 전기 절연성을 동시에 갖춘 첨단 세라믹으로, EV 전력모듈·LED·반도체 패키징의 핵심 방열 소재입니다.",
        tags: ["방열", "전력반도체", "99.99%"],
        apps: ["고출력 LED·LD 방열 기판", "전기차 SiC/IGBT 전력모듈", "반도체 정전척(ESC) / 히터", "고주파 통신 기판", "5G 안테나"],
        details: {
          features: [
            { title: "초고열전도·고절연 양립", points: ["열전도 170~230 W/m·K (Al₂O₃의 5~7배)", "체적저항 >10¹⁴ Ω·cm"] },
            { title: "낮은 열팽창계수", points: ["CTE 4.5 ×10⁻⁶/°C", "Si 웨이퍼와 매칭"] },
            { title: "내플라즈마성", points: ["반도체 ESC·히터 환경 적합"] },
          ],
        },
      },
      {
        name: "질화규소 / Silicon Nitride (Si₃N₄)",
        cat: "질화물",
        formula: "Si₃N₄",
        desc: "질화규소(Si₃N₄)는 고강도·고인성·내열충격성을 갖춘 구조용 세라믹으로, 베어링·터보차저·EV 전력모듈 기판·풍력 발전기 베어링 등에 사용됩니다.",
        tags: ["구조세라믹", "베어링", "99.999%"],
        apps: ["하이브리드·풍력 베어링", "자동차 터보차저 로터", "EV 파워모듈 방열 기판", "절삭공구 인서트", "고온 가스터빈 부품"],
        details: {
          features: [
            { title: "고강도·고인성", points: ["굽힘강도 800~1,000 MPa", "파괴인성 6~8 MPa·m¹/²"] },
            { title: "우수한 내열충격성", points: ["ΔT 800°C 이상", "급랭 조건에서도 균열 적음"] },
          ],
        },
      },
      {
        name: "질화붕소 / Boron Nitride (h-BN)",
        cat: "질화물",
        formula: "h-BN",
        desc: "육방정 질화붕소(h-BN)는 흑연과 유사한 층상구조의 백색 윤활 세라믹으로, 고온 윤활제, 방열 필러, 화장품 진주광택재로 활용됩니다.",
        tags: ["윤활", "방열", "절연"],
        apps: ["5G·EV 통신 기판 방열 필러", "고온 고체 윤활제", "화장품 진주광택 파우더", "도가니 이형제", "용융 알루미늄·유리 용기 코팅"],
      },
      {
        name: "질화티타늄 / Titanium Nitride (TiN)",
        cat: "질화물",
        formula: "TiN",
        desc: "질화티타늄(TiN)은 황금색의 초경도 세라믹으로, 절삭공구·금형·의료용 임플란트·장식용 코팅에 PVD/CVD 방식으로 적용됩니다.",
        tags: ["PVD 코팅", "절삭공구"],
        apps: ["드릴·엔드밀·인서트 PVD 코팅", "사출 금형 표면처리", "의료용 임플란트 코팅", "장식용 골드 코팅", "반도체 배선층"],
      },
      {
        name: "질화지르코늄 / Zirconium Nitride (ZrN)",
        cat: "질화물",
        formula: "ZrN",
        desc: "질화지르코늄(ZrN)은 밝은 황금색 초경도 코팅 소재로, 의료용 인공관절·항공기 부품·절삭공구의 PVD 코팅에 사용됩니다.",
        tags: ["PVD 코팅", "의료"],
        apps: ["의료 인공관절 코팅", "항공기 부품 표면처리", "고급 시계·악세서리 골드 코팅", "초경 인서트 코팅"],
      },
    ],
  },

  // 7. 탄화물
  {
    key: "carbides",
    kr: "탄화물",
    en: "Carbides",
    title: "탄화물 / Carbides",
    items: [
      {
        name: "흑색 탄화규소 / Black Silicon Carbide (SiC)",
        cat: "탄화물",
        formula: "SiC (Black)",
        desc: "흑색 탄화규소(C·SiC)는 모스경도 9.2의 초경도 연마재이자 고온 구조재로, 연마·내화물·전력반도체(SiC 웨이퍼) 원료로 사용됩니다. 순도 80~99.9999% 등급 공급.",
        tags: ["연마재", "내화", "전력반도체"],
        apps: ["정밀 연마재·연마휠", "내화 벽돌·도가니", "SiC 전력반도체 원료", "내마모 코팅", "발열체"],
      },
      {
        name: "녹색 탄화규소 / Green Silicon Carbide (SiC)",
        cat: "탄화물",
        formula: "SiC (Green)",
        desc: "녹색 탄화규소는 흑색 SiC보다 순도가 높고 입자가 예리하여 초경 공구·실리콘 웨이퍼 연마·광학 부품 가공 등 고정밀 분야에 사용됩니다.",
        tags: ["초경연마", "광학가공"],
        apps: ["실리콘 웨이퍼 정밀 연마", "초경합금 공구 연삭", "광학 유리 폴리싱", "세라믹 가공"],
      },
      {
        name: "탄화텅스텐 / Tungsten Carbide (WC)",
        cat: "탄화물",
        formula: "WC",
        desc: "탄화텅스텐(WC)은 다이아몬드 다음의 초경도(모스 9)를 가진 금속 탄화물로, 초경합금 절삭공구·광산 공구·금형·내마모 부품의 핵심 원료입니다.",
        tags: ["초경합금", "절삭공구"],
        apps: ["선반·밀링 인서트", "광산·석유시추 비트", "신선 다이스·금형", "내마모 노즐", "탄도 침투체"],
      },
      {
        name: "탄화티타늄 / Titanium Carbide (TiC)",
        cat: "탄화물",
        formula: "TiC",
        desc: "탄화티타늄(TiC)은 가볍고 단단한 흑색 분말로 초경합금, 코팅, 서멧, 우주항공 합금에 사용됩니다.",
        tags: ["서멧", "우주항공"],
        apps: ["서멧(Cermet) 절삭공구", "고온 합금 첨가", "CVD/PVD 코팅", "우주항공 경량 합금"],
      },
      {
        name: "탄화붕소 / Boron Carbide (B₄C)",
        cat: "탄화물",
        formula: "B₄C",
        desc: "탄화붕소(B₄C)는 다이아몬드·CBN 다음으로 단단한 초경 세라믹으로, 군용 방탄 세라믹과 원자로 제어봉, 정밀 연마재로 사용됩니다.",
        tags: ["방탄세라믹", "원자로"],
        apps: ["군용 방탄 플레이트", "원자로 중성자 흡수 제어봉", "샌드블라스팅 노즐", "고정밀 연마분"],
      },
    ],
  },

  // 8. 고순도 알루미나
  {
    key: "hpa",
    kr: "고순도 알루미나",
    en: "High Purity Alumina",
    title: "고순도 알루미나 / High Purity Alumina (HPA)",
    items: [
      {
        name: "HPA 4N / High Purity Alumina 4N",
        cat: "HPA",
        formula: "α-Al₂O₃ 99.99%",
        desc: "순도 99.99%(4N) 고순도 알루미나(HPA). 리튬배터리 분리막 코팅, 형광체, LED 사파이어 잉곳, 투명 세라믹의 핵심 소재입니다.",
        tags: ["99.99%", "분리막", "LED"],
        apps: ["리튬배터리 분리막 코팅", "LED 사파이어 잉곳 원료", "고급 형광체 호스트", "투명 세라믹·치과용 블록"],
        details: {
          features: [
            { title: "초저 불순물", points: ["Na·Si·Fe·Ca 각 < 10 ppm", "이차전지 안전성 강화"] },
            { title: "α-상 알루미나", points: ["고결정성 α-Al₂O₃", "융점 ~2,050°C, 모스경도 9"] },
          ],
        },
      },
      {
        name: "HPA 5N / High Purity Alumina 5N",
        cat: "HPA",
        formula: "α-Al₂O₃ 99.999%",
        desc: "순도 99.999%(5N) 초고순도 알루미나. 마이크로 LED, 단결정 사파이어, OLED 봉지층, 고출력 레이저 소재용으로 사용됩니다.",
        tags: ["99.999%", "마이크로LED"],
        apps: ["마이크로 LED 기판", "단결정 사파이어 성장", "OLED 봉지 보호층", "고출력 레이저 호스트"],
      },
      {
        name: "고순도 알루미늄 원료 / High Purity Aluminum",
        cat: "HPA",
        formula: "Al 99.998%",
        desc: "HPA 합성용 99.998% 고순도 알루미늄 원료. 가수분해법(HPA) 공정의 출발 물질로 사용됩니다.",
        tags: ["99.998%", "HPA 전구체"],
        apps: ["HPA 합성용 출발 원료", "초고순도 합금", "스퍼터링 타겟"],
      },
      // 나노소재 미러링 (나노 알루미나 시리즈)
      PROD_Nano_Al2O3_4N,
      PROD_Nano_Al2O3_5N,
      PROD_Nano_Al2O3_Disp,
    ],
  },

  // 9. 코런덤 (용융 알루미나)
  {
    key: "corundum",
    kr: "코런덤",
    en: "Corundum",
    title: "코런덤(용융 알루미나) / Corundum (Fused Alumina)",
    items: [
      {
        name: "백색 용융 알루미나 (WFA) / White Fused Alumina",
        cat: "코런덤",
        formula: "Al₂O₃ ≥99%",
        desc: "백색 용융 알루미나(WFA)는 고순도(≥99%) 전기 용융 산화알루미늄으로, 정밀 연마재, 고급 내화재, 세라믹 원료로 사용됩니다.",
        tags: ["연마", "내화"],
        apps: ["정밀 연삭휠·샌드페이퍼", "고급 내화벽돌", "정밀 주조 몰드", "치과·의료용 연마"],
      },
      {
        name: "갈색 용융 알루미나 (BFA) / Brown Fused Alumina",
        cat: "코런덤",
        formula: "Al₂O₃ 95~97%",
        desc: "갈색 용융 알루미나(BFA)는 보크사이트를 전기 용융하여 제조된 갈색 결정으로, 경제적인 가격과 우수한 인성으로 일반 연마·샌드블라스팅·내화재에 광범위 사용됩니다.",
        tags: ["샌드블라스팅", "연삭"],
        apps: ["샌드블라스팅 그리트", "연삭휠·연마지", "캐스터블 내화재", "비활성 미끄럼 방지재"],
      },
      {
        name: "흑색 용융 알루미나 / Black Fused Alumina",
        cat: "코런덤",
        formula: "Al₂O₃ + Fe₂O₃",
        desc: "흑색 용융 알루미나는 산화철을 함유한 흑색 결정으로, 폴리싱·샌드블라스팅·도료 첨가에 사용됩니다.",
        tags: ["폴리싱", "샌드블라스팅"],
        apps: ["스테인리스 폴리싱", "건축자재 미끄럼 방지", "특수 도료 충전재"],
      },
      {
        name: "판상 알루미나 / Tabular Alumina",
        cat: "코런덤",
        formula: "α-Al₂O₃ ≥99%",
        desc: "판상 알루미나는 1,800°C 이상에서 소결된 거대 판상 α-Al₂O₃ 결정으로, 우수한 열충격 안정성과 강도로 고급 내화재·촉매 담체에 사용됩니다.",
        tags: ["내화", "촉매담체"],
        apps: ["제강용 슬라이딩 노즐", "석유화학 촉매 담체", "고온 가마용 내화물", "가스 정제 필터"],
      },
    ],
  },

  // 10. 금속 분말
  {
    key: "metals",
    kr: "금속 분말",
    en: "Metal Powders",
    title: "고순도 금속 분말 / Metal Powders",
    items: [
      {
        name: "규소 분말 / Silicon Powder",
        cat: "금속 분말",
        formula: "Si",
        desc: "고순도 규소 분말. 태양광·반도체·차세대 실리콘 음극재·내화재 원료. 융점 약 1,414°C, 저불순물 등급 공급.",
        tags: ["태양광", "음극재"],
        apps: ["차세대 실리콘 음극재(Si-C)", "태양광 잉곳·웨이퍼 원료", "Si₃N₄·SiC 합성 원료", "Al 합금 첨가제"],
      },
      {
        name: "니켈 분말 / Nickel Powder",
        cat: "금속 분말",
        formula: "Ni",
        desc: "고전도·강자성 고순도 니켈 분말. MLCC 내부전극, 수소 연료전지 촉매, 분말야금에 사용됩니다. 융점 1,455°C.",
        tags: ["MLCC", "촉매"],
        apps: ["MLCC 내부 전극(BME)", "수소 연료전지 촉매", "분말야금 소결 부품", "전자파 차폐"],
      },
      {
        name: "흑연 분말 / Graphite Powder",
        cat: "금속 분말",
        formula: "C",
        desc: "고전도·고열전도·윤활성을 갖춘 흑연 분말. 배터리 음극재, 윤활제, 도전재, 내화재 등으로 광범위 사용.",
        tags: ["배터리", "윤활"],
        apps: ["전기차 배터리 음극재", "고온로 흑연 도가니", "금속 주조 이형제", "전도성 분리판"],
      },
    ],
  },

  // 11. 전해 망간
  {
    key: "manganese",
    kr: "전해 망간",
    en: "Electrolytic Manganese",
    title: "전해 망간 금속 플레이크 / Electrolytic Manganese Metal Flakes",
    items: [PROD_Mn],
  },

  // 12. 기타 무기염
  {
    key: "others",
    kr: "기타 무기염",
    en: "Other Inorganic Salts",
    title: "기타 무기염 / Other Inorganic Salts",
    items: [
      {
        name: "티탄산바륨 / Barium Titanate",
        cat: "기타 무기염",
        formula: "BaTiO₃",
        desc: "티탄산바륨(BaTiO₃)은 강유전성·압전성을 갖춘 핵심 전자 세라믹으로, MLCC, 압전 센서, PTC 서미스터의 주원료입니다.",
        tags: ["MLCC", "압전"],
        apps: ["고용량 MLCC 유전체", "초음파 진동자·소나 센서", "PTC 정온 발열체", "압전 액추에이터"],
        details: {
          features: [
            { title: "강유전성·압전성", points: ["페로브스카이트 결정구조", "큐리온도 ~120°C"] },
            { title: "고유전상수", points: ["εr 1,000~10,000", "MLCC 소형·고용량화"] },
          ],
        },
      },
      {
        name: "수소화알루미늄리튬 / Lithium Aluminium Hydride (LAH)",
        cat: "기타 무기염",
        formula: "LiAlH₄",
        desc: "강력한 환원제인 LiAlH₄는 유기합성·의약품 합성·수소 저장·차세대 배터리 소재로 사용됩니다.",
        tags: ["환원제", "수소저장"],
        apps: ["신약·정밀화학 환원제", "고체 수소 저장 합금", "에스터·아미드 환원", "차세대 배터리 첨가제"],
      },
      {
        name: "마그네슘 비드/그레인 / Magnesium Beads & Granules",
        cat: "기타 무기염",
        formula: "Mg",
        desc: "경량·고반응성 마그네슘 과립. 합금 제조·화학 환원제·생분해성 의료용 임플란트에 활용됩니다.",
        tags: ["합금", "환원제"],
        apps: ["티타늄 제련 환원제", "생분해성 의료 임플란트", "초경량 항공기 합금", "수처리 탈질제"],
      },
      {
        name: "코디어라이트 / Cordierite",
        cat: "기타 무기염",
        formula: "Mg₂Al₄Si₅O₁₈",
        desc: "코디어라이트는 매우 낮은 열팽창계수와 고융점을 가진 세라믹으로, 자동차 촉매 담체와 고주파 통신 기판에 사용됩니다.",
        tags: ["자동차 촉매", "전자기판"],
        apps: ["자동차 배기가스 촉매 담체(허니콤)", "초저열팽창 피자 가마판", "고주파 통신 세라믹 기판", "적외선 가스 버너 패널"],
      },
    ],
  },

  // 13. 희토류 (마지막 위치 - 추후 확장 예정)
  {
    key: "rareearth",
    kr: "희토류",
    en: "Rare Earth",
    title: "희토류 / Rare Earth",
    items: [
      {
        name: "산화이트륨 / Yttrium Oxide",
        cat: "희토류",
        formula: "Y₂O₃",
        desc: "산화이트륨(Y₂O₃)은 흰색의 무정형 분말로, 희토류 원소인 이트륨의 산화물입니다. 고온에서 매우 안정적이며, 뛰어난 광학적·전기적·기계적 특성을 바탕으로 디스플레이, 세라믹, 의료, 에너지 등 첨단 산업 전반에서 필수적인 소재로 사용됩니다.",
        tags: ["세라믹", "형광체", "Y₂O₃"],
        apps: [
          "디스플레이 & 형광체 (LED·PDP·X-Ray·TV)",
          "첨단 세라믹스 (YSZ·Si₃N₄·투명 세라믹)",
          "치과 및 의료 (지르코니아 블록·MRI 조영제)",
          "에너지 & 전자 (SOFC·초전도체·이차전지)",
          "광학 코팅 & 유리 (AR 코팅·UV 필터·CZ)",
          "내식성 & 보안 (CDP·보안 잉크)",
          "항공우주 & 국방 (TBC·미사일 돔)",
        ],
        details: {
          features: [
            { title: "초고온 안정성", points: ["2,410°C의 높은 녹는점", "극한의 고온 환경에서도 안정적인 성능 유지"] },
            { title: "뛰어난 광학 특성", points: ["UV~IR (0.2~8μm) 넓은 투과 범위", "높은 굴절률(~2.0)로 광학 코팅 최적", "낮은 흡수율 – 고출력 레이저 환경 적합"] },
            { title: "전기적 우수성", points: ["고유전율(14~18), 넓은 밴드갭(5.8 eV)", ">3 MV/cm의 우수한 절연 내성"] },
            { title: "화학적 안정성", points: ["물·알칼리에 불용성으로 내화학성 우수", "열역학적으로 매우 안정한 구조"] },
          ],
          appSections: [
            { title: "📺 디스플레이 & 형광체 (Phosphors)", intro: "산화이트륨은 고휘도 형광체의 핵심 원료입니다.", rows: [
              { use: "LED 조명", role: "적색 형광체 재료", note: "Eu 도핑 시 고휘도 발광" },
              { use: "PDP (플라즈마 디스플레이)", role: "적색 발광층", note: "우수한 색순도와 수명" },
              { use: "의료용 X-레이 증감지", role: "형광 스크린", note: "고감도 영상 구현" },
              { use: "대형 TV 형광체", role: "고휘도 발광 재료" },
            ]},
            { title: "🔬 첨단 세라믹스 (Advanced Ceramics)", rows: [
              { use: "이트륨 안정화 지르코니아 (YSZ)", role: "ZrO₂ 안정화 도펀트", note: "내열성·내충격성 향상" },
              { use: "질화규소 (Si₃N₄) 세라믹", role: "소결 조제", note: "엔진 부품, 고온 구조재" },
              { use: "투명 세라믹", role: "적외선 돔, 레이저 창", note: "고온·고압 환경용" },
              { use: "세라믹 연마볼", role: "고순도 연마재" },
            ]},
            { title: "🦷 치과 및 의료", rows: [
              { use: "치과용 지르코니아 블록", role: "안정화제", note: "높은 강도와 생체적합성" },
              { use: "의료용 MRI 조영제", role: "조영제 재료", note: "선명한 영상 구현" },
              { use: "치과 보철 재료", role: "강도 및 심미성 향상" },
            ]},
            { title: "🔋 에너지 & 전자 소재", rows: [
              { use: "고온 초전도체", role: "YBCO(123) 초전도체", note: "에너지 전송 효율 극대화" },
              { use: "고체산화물 연료전지 (SOFC)", role: "전해질 재료 (YSZ)", note: "고효율 에너지 변환" },
              { use: "리튬 이차전지", role: "첨가제 / 코팅재", note: "안전성 및 수명 향상" },
              { use: "커패시터", role: "유전체 재료" },
            ]},
            { title: "☀️ 광학 코팅 & 유리 (Optical Coatings & Glass)", intro: "높은 굴절률과 넓은 투과 범위로 광학 코팅에 필수적입니다.", rows: [
              { use: "레이저 윈도우 코팅", role: "반사방지막 (AR Coating)", note: "고출력 레이저용" },
              { use: "자외선(UV) 차단 필터", role: "UV 흡수/반사층" },
              { use: "고급 광학 유리", role: "굴절률 개선 첨가제", note: "카메라 렌즈, 망원경" },
              { use: "보석 합성", role: "큐빅 지르코니아(CZ) 합성" },
            ]},
            { title: "🛡️ 내식성 & 보안 (Corrosion Protection & Security)", rows: [
              { use: "음극 전착 도료 (CDP)", role: "내식성 첨가제", note: "자동차 부식 방지" },
              { use: "보안 잉크 (위조 방지)", role: "형광 안료", note: "지폐, 문서 위변조 방지" },
              { use: "가스램프 코팅", role: "내열성 발광 코팅" },
            ]},
            { title: "🚀 항공우주 & 국방", rows: [
              { use: "고온 구조 부품", role: "내열 코팅 (열차폐 코팅, TBC)", note: "제트엔진, 터빈 블레이드" },
              { use: "적외선 유도 미사일 돔", role: "투명 세라믹 소재", note: "고온 마하 속도 비행 시 견딤" },
            ]},
          ],
        },
      },
      {
        name: "이트륨 안정화 지르코니아 / Yttria-Stabilized Zirconia",
        cat: "희토류",
        formula: "YSZ",
        desc: "이트륨 안정화 지르코니아(YSZ)는 순수 지르코니아(ZrO₂)에 산화이트륨(Y₂O₃)을 일정 비율로 첨가하여 상온에서도 안정적인 입방정(Cubic) 또는 정방정(Tetragonal) 구조를 유지하도록 만든 고기능 세라믹 소재입니다. 순수 지르코니아의 상전이(Phase Transition)를 억제하여 뛰어난 기계적 강도, 내마모성, 산소 이온 전도성을 제공합니다.",
        tags: ["열차폐", "연료전지", "YSZ"],
        apps: [
          "치과 및 의료 (크라운·임플란트·인공관절)",
          "에너지 (SOFC·산소센서·고온 전기분해)",
          "열차폐 코팅 (항공기 터빈·가스터빈·디젤엔진)",
          "구조 세라믹스 (세라믹 나이프·베어링볼·광섬유 페룰)",
          "전자 및 광학 (산소센서·형광체 호스트)",
        ],
        details: {
          features: [
            { title: "뛰어난 기계적 강도와 인성", points: ["변형 강화(Transformation Toughening)로 균열 전파 억제", "세라믹 중 최고 수준의 파괴 인성", "높은 굽힘 강도(1,000 MPa 이상)로 금속 대체 가능"] },
            { title: "산소 이온 전도성 (고체 전해질)", points: ["600~1,000°C에서 산소 이온(O²⁻) 전도성 우수", "전자는 통과시키지 않아 SOFC 전해질로 최적"] },
            { title: "생체 적합성", points: ["인체에 무해하고 부식에 강함", "치과용 및 의료용 임플란트에 널리 사용"] },
            { title: "내마모성 및 내화학성", points: ["모스경도 8로 매우 단단", "대부분의 산·알칼리에 대해 높은 내식성"] },
            { title: "낮은 열전도율", points: ["열차폐 코팅(TBC)으로 활용", "금속 기판을 고온으로부터 보호"] },
          ],
          appSections: [
            { title: "🦷 치과 및 의료", rows: [
              { use: "치과용 크라운 / 브릿지", role: "전부도재관", note: "뛰어난 심미성과 생체적합성" },
              { use: "치과용 임플란트 지대주", role: "고강도 구조재", note: "부식 없음, 알레르기 반응 거의 없음" },
              { use: "인공 고관절 (볼-소켓)", role: "마모 방지", note: "내마모성 우수" },
              { use: "수술용 메스 / 칼날", role: "초정밀 절삭날", note: "영구적으로 날카로움 유지" },
            ]},
            { title: "⚡ 에너지 (고체 산화물 연료전지, SOFC)", rows: [
              { use: "SOFC 전해질", role: "산소 이온 전도막", note: "8YSZ가 표준 소재" },
              { use: "산소센서 (람다센서)", role: "자동차 배기가스 산소 측정" },
              { use: "고온 전기분해 셀", role: "수소 생산" },
            ]},
            { title: "🛡️ 열차폐 코팅 (Thermal Barrier Coating, TBC)", rows: [
              { use: "항공기 터빈 블레이드", role: "고온 보호 코팅", note: "금속 기판 수명 연장" },
              { use: "가스터빈 엔진", role: "단열 및 부식 방지" },
              { use: "디젤엔진 부품", role: "열손실 감소, 효율 향상" },
            ]},
            { title: "🛠 구조 세라믹스 및 정밀 부품", rows: [
              { use: "세라믹 나이프 / 가위", role: "초경도, 비자성, 부식 없음" },
              { use: "펌프 부품 (피스톤, 라이너)", role: "내마모성, 내화학성" },
              { use: "베어링 볼 (세라믹 볼)", role: "경도 높고 마찰 적음" },
              { use: "연마재 및 분쇄 매체", role: "고순도 분쇄용 볼, 라이너" },
              { use: "광섬유 페룰", role: "정밀 가공 부품" },
            ]},
            { title: "📱 전자 및 광학", rows: [
              { use: "산소센서", role: "배기가스 제어", note: "자동차, 산업용" },
              { use: "고체산화물 연료전지", role: "전해질 지지체" },
              { use: "레어어스 도핑 형광체", role: "발광 호스트 소재" },
            ]},
          ],
        },
      },
      // 나노소재 미러링 (희토류 관련)
      PROD_Nano_RareEarth,
      PROD_Nano_PolishingPowder,
    ],
  },

  // 14. 이차전지 (마지막 위치 - 관련 품목 미러링)
  {
    key: "battery",
    kr: "이차전지",
    en: "Secondary Battery",
    title: "이차전지 / Secondary Battery",
    items: [
      PROD_Li2CO3,
      PROD_LiF,
      PROD_Mn3O4,
      PROD_Mn,
      {
        name: "흑연 분말 (음극재용) / Graphite Powder (Anode Grade)",
        cat: "음극재",
        formula: "C",
        desc: "리튬이온 이차전지 음극재용 고순도 흑연 분말(천연·인조). 우수한 전도성과 가역 용량(372 mAh/g)으로 EV·ESS·소형 IT 디바이스에 광범위 적용됩니다.",
        tags: ["음극재", "EV·ESS"],
        apps: ["전기차 배터리 음극재", "ESS 대용량 음극재", "도전재(Conductive Additive)", "리튬-황·전고체 전지 첨가제"],
        details: {
          features: [
            { title: "고전도성·고가역 용량", points: ["이론 용량 372 mAh/g", "장기 사이클 안정성 우수"] },
            { title: "구형화·코팅 처리", points: ["구형 흑연(SPG)으로 탭밀도 향상", "탄소 코팅으로 SEI 안정화"] },
            { title: "저불순물 관리", points: ["Fe·S·Ash 관리 등급", "셀 자가방전 최소화"] },
          ],
        },
      },
    ],
  },
];


export const getCategory = (key: string) => CATEGORIES.find((c) => c.key === key);
export const findProduct = (catKey: string, slug: string) => {
  const c = getCategory(catKey);
  if (!c) return null;
  return c.items.find((p) => slugify(p.name) === slug) || null;
};

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "");
