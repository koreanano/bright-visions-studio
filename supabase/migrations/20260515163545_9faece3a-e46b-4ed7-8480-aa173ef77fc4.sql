
ALTER TABLE public.news 
  ADD COLUMN IF NOT EXISTS image_url text,
  ADD COLUMN IF NOT EXISTS source_url text;

DROP FUNCTION IF EXISTS public.list_news();
DROP FUNCTION IF EXISTS public.get_news(uuid, text);

CREATE OR REPLACE FUNCTION public.list_news()
 RETURNS TABLE(id uuid, title text, author text, is_private boolean, created_at timestamp with time zone, content text, image_url text, source_url text)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT id, title, author, false AS is_private, created_at, content, image_url, source_url
  FROM public.news
  ORDER BY created_at DESC
  LIMIT 200;
$function$;

CREATE OR REPLACE FUNCTION public.get_news(_id uuid, _password text DEFAULT NULL::text)
 RETURNS TABLE(id uuid, title text, author text, is_private boolean, created_at timestamp with time zone, content text, unlocked boolean, image_url text, source_url text)
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  RETURN QUERY
  SELECT n.id, n.title, n.author, false, n.created_at, n.content, true, n.image_url, n.source_url
  FROM public.news n
  WHERE n.id = _id;
END;
$function$;

INSERT INTO storage.buckets (id, name, public)
VALUES ('news-images', 'news-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "news_images_public_read" ON storage.objects;
DROP POLICY IF EXISTS "news_images_anyone_upload" ON storage.objects;

CREATE POLICY "news_images_public_read"
ON storage.objects FOR SELECT
USING (bucket_id = 'news-images');

CREATE POLICY "news_images_anyone_upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'news-images');
