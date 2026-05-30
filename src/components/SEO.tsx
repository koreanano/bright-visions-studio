import { Helmet } from "react-helmet-async";

const BRAND = "나노코리아/첨단세라믹,첨단나노소재,신소재,무기화합물,B2B전문공급";
const BASE_DESC =
  "나노코리아/첨단세라믹, 나노소재, 탄산염, 불화물, 산화물, 무기 화합물을 이차전지 등 산업별 맞춤형 원료로 공급하는 B2B 전문 기업입니다.";
const SITE_URL = "https://nano-korea.co.kr";

type Props = {
  /** 완전한 title 직접 지정 (지정 시 brand 템플릿을 사용하지 않음) */
  title?: string;
  /** 완전한 description 직접 지정 (지정 시 base 템플릿을 사용하지 않음) */
  description?: string;
  /** 페이지명 또는 제품명. title이 없을 때 사용 */
  pageName?: string;
  /** 페이지/제품 상세 보충 설명 (한 문장) */
  detail?: string;
  /** 사이트 내 경로. 예: "/products/oxides" */
  path?: string;
  /** 추가 og:image */
  image?: string;
  /** og:type (기본 website) */
  type?: string;
  /** 검색 색인 제외가 필요한 페이지 */
  noIndex?: boolean;
};

const clip = (s: string, n = 158) => {
  const t = s.replace(/\s+/g, " ").trim();
  return t.length > n ? t.slice(0, n - 1) + "…" : t;
};

const SEO = ({
  title,
  description,
  pageName,
  detail,
  path = "/",
  image,
  type = "website",
  noIndex = false,
}: Props) => {
  const finalTitle = title ?? (pageName ? `${pageName} | ${BRAND}` : BRAND);
  const fallbackDesc = (() => {
    const tail = detail
      ? ` ${detail}`
      : pageName
      ? ` ${pageName} 관련 상세 정보를 확인하세요.`
      : "";
    return clip(`${BASE_DESC}${tail}`);
  })();
  const finalDescription = description ? clip(description) : fallbackDesc;
  const canonical = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      {image && <meta property="og:image" content={image} />}
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};

export default SEO;
