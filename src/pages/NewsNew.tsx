import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  title: z.string().trim().min(1, "제목을 입력하세요").max(200),
  author: z.string().trim().max(50).optional(),
  content: z.string().trim().min(1, "내용을 입력하세요").max(10000),
  is_private: z.boolean(),
  password: z.string().max(50).optional(),
});

const NewsNew = () => {
  const nav = useNavigate();
  const { toast } = useToast();
  const [isPrivate, setIsPrivate] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      title: String(fd.get("title") || ""),
      author: String(fd.get("author") || "") || undefined,
      content: String(fd.get("content") || ""),
      is_private: isPrivate,
      password: String(fd.get("password") || "") || undefined,
    });
    if (!parsed.success) {
      toast({ title: "입력 오류", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    if (parsed.data.is_private && !parsed.data.password) {
      toast({ title: "비밀번호 필요", description: "비공개 글은 비밀번호가 필요합니다.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("news").insert({
      title: parsed.data.title,
      author: parsed.data.author || "익명",
      content: parsed.data.content,
      is_private: parsed.data.is_private,
      password: parsed.data.is_private ? parsed.data.password : null,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "등록 실패", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "등록되었습니다." });
    nav("/news");
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <section className="mx-auto max-w-[760px] px-6 pb-20 pt-28 lg:px-12">
        <div className="mb-8 border-b border-border pb-5">
          <Link to="/news" className="text-xs text-muted-foreground hover:text-accent">← 목록</Link>
          <h1 className="mt-2 text-3xl font-bold text-ink">새 글 작성</h1>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title">제목</Label>
            <Input id="title" name="title" maxLength={200} required placeholder="제목을 입력하세요" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">작성자</Label>
            <Input id="author" name="author" maxLength={50} placeholder="익명" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">내용</Label>
            <Textarea id="content" name="content" maxLength={10000} required rows={12} placeholder="내용을 입력하세요" />
          </div>

          <div className="flex items-center justify-between rounded-md border border-border bg-muted/30 px-4 py-3">
            <div>
              <Label htmlFor="is_private" className="cursor-pointer">비공개 글</Label>
              <p className="mt-0.5 text-xs text-muted-foreground">비밀번호를 알아야 본문을 볼 수 있습니다.</p>
            </div>
            <Switch id="is_private" checked={isPrivate} onCheckedChange={setIsPrivate} />
          </div>

          {isPrivate && (
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input id="password" name="password" type="password" maxLength={50} required placeholder="열람용 비밀번호" />
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => nav("/news")}>취소</Button>
            <Button type="submit" disabled={submitting} className="bg-ink text-white hover:bg-accent">
              {submitting ? "등록 중…" : "등록"}
            </Button>
          </div>
        </form>
      </section>
      <Footer />
    </main>
  );
};

export default NewsNew;
