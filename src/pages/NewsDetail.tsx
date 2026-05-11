import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Calendar, User, ArrowLeft, Trash2 } from "lucide-react";
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
  created_at: string;
  content: string;
};

const NewsDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [delPw, setDelPw] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [delOpen, setDelOpen] = useState(false);

  useEffect(() => {
    (async () => {
      if (!id) return;
      const { data, error } = await supabase.rpc("get_news", { _id: id, _password: null });
      if (error) {
        toast({ title: "오류", description: error.message, variant: "destructive" });
      } else {
        setNews(((data as News[]) || [])[0] || null);
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onDelete = async () => {
    if (!id) return;
    setDeleting(true);
    const { data, error } = await supabase.rpc("delete_news", { _id: id, _password: delPw });
    setDeleting(false);
    if (error) {
      toast({ title: "삭제 실패", description: error.message, variant: "destructive" });
      return;
    }
    if (data === true) {
      toast({ title: "삭제되었습니다." });
      setDelOpen(false);
      navigate("/news");
    } else {
      toast({ title: "삭제 실패", description: "비밀번호가 일치하지 않습니다.", variant: "destructive" });
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <article className="mx-auto max-w-[820px] px-6 pb-20 pt-28 lg:px-12">
        <Link to="/news" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-accent">
          <ArrowLeft className="h-3.5 w-3.5" /> 게시판 목록
        </Link>

        {loading ? (
          <p className="py-20 text-center text-sm text-muted-foreground">불러오는 중…</p>
        ) : !news ? (
          <p className="py-20 text-center text-sm text-muted-foreground">글을 찾을 수 없습니다.</p>
        ) : (
          <>
            <header className="mt-6 border-b border-border pb-8">
              <div className="flex items-start justify-between gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  Board
                </span>
                <AlertDialog open={delOpen} onOpenChange={(o) => { setDelOpen(o); if (!o) setDelPw(""); }}>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1 text-destructive hover:text-destructive">
                      <Trash2 className="h-3.5 w-3.5" /> 삭제
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>이 글을 삭제하시겠습니까?</AlertDialogTitle>
                      <AlertDialogDescription>
                        작성 시 설정한 비밀번호를 입력하세요. 삭제 후에는 되돌릴 수 없습니다.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <Input
                      type="password"
                      value={delPw}
                      onChange={(e) => setDelPw(e.target.value)}
                      placeholder="비밀번호"
                      maxLength={50}
                      autoFocus
                    />
                    <AlertDialogFooter>
                      <AlertDialogCancel>취소</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={(e) => { e.preventDefault(); onDelete(); }}
                        disabled={deleting || !delPw}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {deleting ? "삭제 중…" : "삭제"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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
              <div className="whitespace-pre-wrap text-[15px] leading-8 text-ink/90">
                {news.content}
              </div>
            </div>
          </>
        )}
      </article>
      <Footer />
    </main>
  );
};

export default NewsDetail;
