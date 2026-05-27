import { Helmet } from "react-helmet-async";

const BRAND = "나노코리아/첨단세라믹,첨단나노소재,신소재,무기화합물,B2B전문공급";
const BASE_DESC =
  "나노코리아/첨단세라믹, 나노소재, 탄산염, 불화물, 산화물, 무기 화합물을 이차전지 등 산업별 맞춤형 원료로 공급하는 B2B 전문 기업입니다.";
const SITE_URL = "https://nano-korea.co.kr";

type Props = {
  /** 페이지명 또는 제품명. 비우면 브랜드 타이틀만 사용 */
  pageName?: string;
  /** 페이지/제품 상세 보충 설명 (한 문장) */
  detail?: string;
  /** 사이트 내 경로. 예: "/products/oxides" */
  path?: string;
  /** 추가 og:image */
  image?: string;
  /** og:type (기본 website) */
  type?: string;
};

const clip = (s: string, n = 158) => {
  const t = s.replace(/\s+/g, " ").trim();
  return t.length > n ? t.slice(0, n - 1) + "…" : t;
};

const SEO = ({ pageName, detail, path = "/", image, type = "website" }: Props) => {
  const title = pageName ? `${pageName} | ${BRAND}` : BRAND;
  const tail = detail
    ? ` ${detail}`
    : pageName
    ? ` ${pageName} 관련 상세 정보를 확인하세요.`
    : "";
  const description = clip(`${BASE_DESC}${tail}`);
  const canonical = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};

export default SEO;
