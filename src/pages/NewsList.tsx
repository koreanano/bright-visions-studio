import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type NewsRow = {
  id: string;
  title: string;
  author: string;
  is_private: boolean;
  created_at: string;
  content: string;
};

const NewsList = () => {
  const [rows, setRows] = useState<NewsRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.rpc("list_news");
      setRows((data as NewsRow[]) || []);
      setLoading(false);
    })();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <section className="mx-auto max-w-[1100px] px-6 pb-16 pt-28 lg:px-12">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Board</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink lg:text-4xl">게시판</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              공지사항·업계 소식·기술 정보를 자유롭게 공유하세요.
            </p>
          </div>
          <Link to="/news/new">
            <Button className="gap-2 bg-ink text-white hover:bg-accent">
              <Plus className="h-4 w-4" /> 글쓰기
            </Button>
          </Link>
        </div>

        {loading ? (
          <p className="py-16 text-center text-sm text-muted-foreground">불러오는 중…</p>
        ) : rows.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">아직 등록된 글이 없습니다.</p>
        ) : (
          <ul className="divide-y divide-border border-y border-border">
            {rows.map((r) => (
              <li key={r.id}>
                <Link
                  to={`/news/${r.id}`}
                  className="grid grid-cols-[1fr_auto] items-center gap-4 px-1 py-5 transition-colors hover:bg-muted/40"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      {r.is_private && <Lock className="h-3.5 w-3.5 text-accent" />}
                      <h2 className="truncate text-base font-semibold text-ink">{r.title}</h2>
                    </div>
                    {!r.is_private && r.content && (
                      <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{r.content}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end text-xs text-muted-foreground">
                    <span className="font-medium text-ink/70">{r.author}</span>
                    <span>{new Date(r.created_at).toLocaleDateString("ko-KR")}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
      <Footer />
    </main>
  );
};

export default NewsList;
