import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      {/* Top nav bar */}
      <div className="border-b border-border">
        <nav className="mx-auto flex max-w-[1440px] items-center justify-center gap-8 px-6 py-6 text-sm font-medium text-ink/80 lg:px-12 lg:py-8">
          <a href="/#top" className="hover:text-accent">홈</a>
          <Link to="/about#top" className="hover:text-accent">회사소개</Link>
          <a href="/#products" className="hover:text-accent">제품</a>
          <Link to="/news" className="hover:text-accent">게시판</Link>
          <Link to="/faq" className="hover:text-accent">FAQ</Link>
          <a href="/#contact" className="hover:text-accent">문의하기</a>
        </nav>
      </div>

      {/* Bottom row */}
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 py-6 lg:flex-row lg:items-end lg:justify-between lg:px-12">
        <Link to="/" className="flex flex-col leading-tight">
          <span className="text-lg font-bold tracking-tight text-ink">
            NANO<span className="gradient-text-prism">KOREA</span>
          </span>
          <span className="mt-0.5 text-[10px] font-semibold tracking-[0.2em] text-muted-foreground">
            첨단소재공급기업
          </span>
        </Link>

        <div className="flex flex-col items-center gap-2 text-center text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/terms" className="hover:text-ink">이용약관</Link>
            <span className="text-border">|</span>
            <Link to="/privacy" className="hover:text-ink">개인정보처리방침</Link>
            <span className="text-border">|</span>
            <a href="mailto:contact@nano-korea.co.kr" className="hover:text-accent">
              contact@nano-korea.co.kr
            </a>
            <span className="text-border">|</span>
            <span>© 2024 nano-korea. All rights reserved.</span>
          </div>
        </div>

        <div className="hidden lg:block lg:w-[120px]" />
      </div>

      {/* Business registration info */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-center gap-1 px-6 py-4 text-xs text-muted-foreground lg:flex-row lg:gap-6 lg:px-12">
          <span>사업자등록번호 725-87-03238</span>
          <span className="hidden lg:inline text-border">|</span>
          <span>주식회사디솔루션</span>
          <span className="hidden lg:inline text-border">|</span>
          <span>T. 031-356-5682</span>
          <span className="hidden lg:inline text-border">|</span>
          <span>대표자 최은성</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
