import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  title: z.string().trim().min(1, "제목을 입력하세요").max(200),
  author: z.string().trim().max(50).optional(),
  content: z.string().trim().min(1, "내용을 입력하세요").max(10000),
  password: z.string().min(1, "삭제용 비밀번호를 입력하세요").max(50),
  source_url: z
    .string()
    .trim()
    .max(500)
    .optional()
    .refine((v) => !v || /^https?:\/\//i.test(v), "출처는 http(s):// 로 시작해야 합니다"),
});

const NewsNew = () => {
  const nav = useNavigate();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onPickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setImageFile(f);
    setImagePreview(f ? URL.createObjectURL(f) : null);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      title: String(fd.get("title") || ""),
      author: String(fd.get("author") || "") || undefined,
      content: String(fd.get("content") || ""),
      password: String(fd.get("password") || ""),
      source_url: String(fd.get("source_url") || "") || undefined,
    });
    if (!parsed.success) {
      toast({ title: "입력 오류", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }

    setSubmitting(true);

    let image_url: string | null = null;
    if (imageFile) {
      if (imageFile.size > 5 * 1024 * 1024) {
        setSubmitting(false);
        toast({ title: "이미지가 너무 큽니다", description: "5MB 이하만 업로드 가능합니다.", variant: "destructive" });
        return;
      }
      const ext = imageFile.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("news-images")
        .upload(path, imageFile, { contentType: imageFile.type, upsert: false });
      if (upErr) {
        setSubmitting(false);
        toast({ title: "이미지 업로드 실패", description: upErr.message, variant: "destructive" });
        return;
      }
      image_url = supabase.storage.from("news-images").getPublicUrl(path).data.publicUrl;
    }

    const { error } = await supabase.from("news").insert({
      title: parsed.data.title,
      author: parsed.data.author || "익명",
      content: parsed.data.content,
      is_private: false,
      password: parsed.data.password,
      image_url,
      source_url: parsed.data.source_url || null,
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

          <div className="space-y-2">
            <Label htmlFor="image">이미지 첨부 (선택, 5MB 이하)</Label>
            <Input id="image" name="image" type="file" accept="image/*" onChange={onPickImage} />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="미리보기"
                className="mt-2 max-h-64 w-auto rounded border border-border object-contain"
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="source_url">출처 링크 (선택)</Label>
            <Input
              id="source_url"
              name="source_url"
              type="url"
              maxLength={500}
              placeholder="https://example.com/article"
            />
            <p className="text-xs text-muted-foreground">다른 곳에서 가져온 자료라면 원문 주소를 입력하세요. 본문 하단에 클릭 가능한 링크로 표시됩니다.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">삭제용 비밀번호</Label>
            <Input id="password" name="password" type="password" maxLength={50} required placeholder="삭제할 때 사용할 비밀번호" />
            <p className="text-xs text-muted-foreground">이 비밀번호를 알아야 글을 삭제할 수 있습니다.</p>
          </div>

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
