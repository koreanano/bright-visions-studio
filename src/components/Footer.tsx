import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 lg:flex-row lg:items-end lg:justify-between lg:px-12">
        {/* Left brand */}
        <Link to="/" className="flex flex-col leading-tight">
          <span className="text-lg font-bold tracking-tight text-ink">
            NANO<span className="gradient-text-prism">KOREA</span>
          </span>
          <span className="mt-0.5 text-[10px] font-semibold tracking-[0.2em] text-muted-foreground">
            첨단소재공급기업
          </span>
        </Link>

        {/* Center legal */}
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
            <span>© 2025 nano-korea. All rights reserved.</span>
          </div>
        </div>

        <div className="hidden lg:block lg:w-[120px]" />
      </div>
    </footer>
  );
};

export default Footer;
