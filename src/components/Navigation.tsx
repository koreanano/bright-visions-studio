import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X, Search } from "lucide-react";
import { CATEGORIES } from "@/data/products";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const transparent = isHome && !scrolled && !mobile && !searchOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    navigate(term ? `/products?q=${encodeURIComponent(term)}` : "/products");
    setSearchOpen(false);
    setMobile(false);
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-3 lg:px-12">
        <Link to="/" className="flex flex-col leading-tight">
          <span className="text-lg font-bold tracking-tight text-ink">
            NANO<span className="gradient-text-prism">KOREA</span>
          </span>
          <span className="mt-0.5 text-[10px] font-semibold tracking-[0.2em] text-muted-foreground">
            첨단소재공급기업
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link to="/about" className="text-sm font-medium text-ink/80 hover:text-accent">
            나노코리아
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-ink/80 hover:text-accent">
              제품 카테고리 <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {open && (
              <div className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-2">
                <ul className="border border-border bg-background shadow-lg">
                  <li>
                    <Link
                      to="/products"
                      className="block border-b border-border px-4 py-3 text-sm font-semibold text-ink hover:bg-muted hover:text-accent"
                    >
                      전체 제품 보기
                    </Link>
                  </li>
                  {CATEGORIES.map((c) => (
                    <li key={c.key}>
                      <Link
                        to={`/products/${c.key}`}
                        className="block px-4 py-2.5 text-sm text-ink/80 hover:bg-muted hover:text-accent"
                      >
                        {c.kr} <span className="text-xs text-muted-foreground">/ {c.en}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <Link to="/news" className="text-sm font-medium text-ink/80 hover:text-accent">
            게시판
          </Link>
          <Link to="/faq" className="text-sm font-medium text-ink/80 hover:text-accent">
            FAQ
          </Link>
          <form onSubmit={submitSearch} className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 focus-within:border-accent">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="제품 검색"
              className="w-32 bg-transparent text-xs text-ink placeholder:text-muted-foreground focus:outline-none lg:w-40"
            />
          </form>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink hover:border-accent hover:text-accent"
            onClick={() => setSearchOpen((s) => !s)}
            aria-label="제품 검색"
          >
            <Search className="h-4 w-4" />
          </button>
          <a
            href="/#contact"
            className="hidden bg-ink px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-accent md:inline-block"
          >
            문의하기
          </a>
          <button
            className="md:hidden"
            onClick={() => setMobile(!mobile)}
            aria-label="menu"
          >
            {mobile ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <form onSubmit={submitSearch} className="mx-auto flex max-w-[1440px] items-center gap-2 px-6 py-3">
            <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 focus-within:border-accent">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="제품을 검색해 보세요"
                className="flex-1 bg-transparent text-sm text-ink placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
            <button type="submit" className="rounded-full bg-ink px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-accent">
              검색
            </button>
          </form>
        </div>
      )}

      {mobile && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="px-6 py-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              제품 카테고리
            </div>
            <ul className="mb-4 space-y-1">
              <li>
                <Link to="/products" onClick={() => setMobile(false)} className="block py-1.5 text-sm font-semibold text-ink">
                  전체 제품 보기
                </Link>
              </li>
              {CATEGORIES.map((c) => (
                <li key={c.key}>
                  <Link to={`/products/${c.key}`} onClick={() => setMobile(false)} className="block py-1.5 text-sm text-ink/80">
                    {c.kr}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-1 border-t border-border pt-3">
              <Link to="/about" onClick={() => setMobile(false)} className="block py-1.5 text-sm">나노코리아</Link>
              <Link to="/about" onClick={() => setMobile(false)} className="block py-1.5 text-sm">회사소개서</Link>
              <Link to="/news" onClick={() => setMobile(false)} className="block py-1.5 text-sm">게시판</Link>
              <Link to="/faq" onClick={() => setMobile(false)} className="block py-1.5 text-sm">FAQ</Link>
              <a href="/#contact" className="mt-2 block bg-ink px-4 py-2 text-center text-xs font-bold uppercase text-white">
                문의하기
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
