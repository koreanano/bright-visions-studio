import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <Link to="/terms" className="hover:text-ink">이용약관</Link>
            <span className="text-border">|</span>
            <Link to="/privacy" className="hover:text-ink">개인정보처리방침</Link>
            <span className="text-border">|</span>
            <span>© 2023 nano-korea. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
