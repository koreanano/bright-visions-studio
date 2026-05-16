import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Home, Search } from "lucide-react";
import { useState } from "react";
import { CATEGORIES, getCategory, slugify, type CategoryKey } from "@/data/products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CategoryNav = () => {
  const { categoryKey } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [q, setQ] = useState(params.get("q") || "");
  const [selectedCat, setSelectedCat] = useState<CategoryKey | "">(
    (categoryKey as CategoryKey) || "",
  );

  const currentCat = selectedCat ? getCategory(selectedCat) : null;

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    navigate(term ? `/products?q=${encodeURIComponent(term)}` : "/products");
  };

  return (
    <div className="sticky top-[65px] z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Dual dropdown */}
        <div className="flex flex-wrap items-center gap-2 pt-3">
          <Select
            value={selectedCat}
            onValueChange={(v) => {
              setSelectedCat(v as CategoryKey);
              navigate(`/products/${v}`);
            }}
          >
            <SelectTrigger className="h-9 w-[200px] text-xs font-semibold">
              <SelectValue placeholder="카테고리 선택" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c.key} value={c.key} className="text-xs">
                  {c.kr} · {c.en}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value=""
            disabled={!currentCat || currentCat.items.length === 0}
            onValueChange={(slug) => {
              if (currentCat) navigate(`/products/${currentCat.key}/${slug}`);
            }}
          >
            <SelectTrigger className="h-9 w-[280px] text-xs font-semibold">
              <SelectValue
                placeholder={
                  currentCat
                    ? currentCat.items.length
                      ? "제품 선택"
                      : "등록된 제품이 없습니다"
                    : "먼저 카테고리를 선택하세요"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {currentCat?.items.map((p) => (
                <SelectItem key={p.name} value={slugify(p.name)} className="text-xs">
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Pills + search */}
        <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
          <Link
            to="/products"
            aria-label="제품 카테고리 홈"
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-ink transition hover:border-accent hover:text-accent"
          >
            <Home className="h-3.5 w-3.5" />
            홈
          </Link>
          <Link
            to="/products"
            className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              !categoryKey
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-ink hover:border-accent hover:text-accent"
            }`}
          >
            전체
          </Link>
          {CATEGORIES.map((c) => {
            const active = c.key === categoryKey;
            return (
              <Link
                key={c.key}
                to={`/products/${c.key}`}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  active
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-ink hover:border-accent hover:text-accent"
                }`}
              >
                {c.kr}
              </Link>
            );
          })}
          <form onSubmit={onSearch} className="ml-auto flex shrink-0 items-center gap-1 rounded-full border border-border bg-background px-3 py-1.5 focus-within:border-accent">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="제품 검색..."
              className="w-32 bg-transparent text-xs text-ink placeholder:text-muted-foreground focus:outline-none md:w-44"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
