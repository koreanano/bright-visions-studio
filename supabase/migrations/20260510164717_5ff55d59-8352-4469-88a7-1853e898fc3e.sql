CREATE TABLE public.news (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  content text NOT NULL,
  author text NOT NULL DEFAULT '익명',
  is_private boolean NOT NULL DEFAULT false,
  password text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone_can_insert_news" ON public.news
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(title) > 0 AND length(title) <= 200
    AND length(content) > 0 AND length(content) <= 10000
    AND length(author) <= 50
    AND (is_private = false OR (password IS NOT NULL AND length(password) >= 1))
  );

CREATE POLICY "anyone_can_select_news" ON public.news
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE INDEX idx_news_created_at ON public.news (created_at DESC);