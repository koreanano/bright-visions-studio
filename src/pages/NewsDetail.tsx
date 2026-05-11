import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Calendar, Lock, User, ArrowLeft, KeyRound, Trash2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type News = {
  id: string;
  title: string;
  author: string;
  is_private: boolean;
  created_at: string;
  content: string;
  unlocked: boolean;
};

const NewsDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [pw, setPw] = useState("");
  const [trying, setTrying] = useState(false);

  const load = async (password?: string) => {
    if (!id) return;
    const { data, error } = await supabase.rpc("get_news", { _id: id, _password: password ?? null });
    if (error) {
      toast({ title: "오류", description: error.message, variant: "destructive" });
      return;
    }
    const row = (data as News[])?.[0] || null;
    setNews(row);
    return row;
  };

  useEffect(() => {
    (async () => {
      await load();
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setTrying(true);
    const row = await load(pw);
    setTrying(false);
    if (row && !row.unlocked) {
      toast({ title: "비밀번호가 일치하지 않습니다.", variant: "destructive" });
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <article className="mx-auto max-w-[820px] px-6 pb-20 pt-28 lg:px-12">
        <Link to="/news" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-accent">
          <ArrowLeft className="h-3.5 w-3.5" /> 뉴스 목록
        </Link>

        {loading ? (
          <p className="py-20 text-center text-sm text-muted-foreground">불러오는 중…</p>
        ) : !news ? (
          <p className="py-20 text-center text-sm text-muted-foreground">글을 찾을 수 없습니다.</p>
        ) : (
          <>
            <header className="mt-6 border-b border-border pb-8">
              <div className="flex items-center gap-2">
                {news.is_private && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent">
                    <Lock className="h-3 w-3" /> Private
                  </span>
                )}
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  News
                </span>
              </div>
              <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-ink lg:text-4xl">
                {news.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" /> {news.author}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(news.created_at).toLocaleString("ko-KR")}
                </span>
              </div>
            </header>

            <div className="prose prose-neutral max-w-none py-10">
              {news.unlocked ? (
                <div className="whitespace-pre-wrap text-[15px] leading-8 text-ink/90">
                  {news.content}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
                  <Lock className="mx-auto h-8 w-8 text-accent" />
                  <h3 className="mt-3 text-base font-semibold text-ink">비공개 글입니다</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    열람하려면 작성자가 설정한 비밀번호를 입력하세요.
                  </p>
                  <form onSubmit={onUnlock} className="mx-auto mt-5 flex max-w-sm gap-2">
                    <Input
                      type="password"
                      value={pw}
                      onChange={(e) => setPw(e.target.value)}
                      placeholder="비밀번호"
                      maxLength={50}
                    />
                    <Button type="submit" disabled={trying} className="gap-1 bg-ink text-white hover:bg-accent">
                      <KeyRound className="h-3.5 w-3.5" /> 열람
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </>
        )}
      </article>
      <Footer />
    </main>
  );
};

export default NewsDetail;
