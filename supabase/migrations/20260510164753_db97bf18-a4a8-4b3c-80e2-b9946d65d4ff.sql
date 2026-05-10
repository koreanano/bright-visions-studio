DROP POLICY IF EXISTS "anyone_can_select_news" ON public.news;

CREATE POLICY "public_news_visible" ON public.news
  FOR SELECT TO anon, authenticated
  USING (is_private = false);

CREATE OR REPLACE FUNCTION public.list_news()
RETURNS TABLE (
  id uuid,
  title text,
  author text,
  is_private boolean,
  created_at timestamptz,
  content text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    id,
    title,
    author,
    is_private,
    created_at,
    CASE WHEN is_private THEN '' ELSE content END AS content
  FROM public.news
  ORDER BY created_at DESC
  LIMIT 200;
$$;

CREATE OR REPLACE FUNCTION public.get_news(_id uuid, _password text DEFAULT NULL)
RETURNS TABLE (
  id uuid,
  title text,
  author text,
  is_private boolean,
  created_at timestamptz,
  content text,
  unlocked boolean
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    n.id, n.title, n.author, n.is_private, n.created_at,
    CASE
      WHEN n.is_private = false THEN n.content
      WHEN n.is_private = true AND _password IS NOT NULL AND n.password = _password THEN n.content
      ELSE ''
    END AS content,
    (n.is_private = false OR (_password IS NOT NULL AND n.password = _password)) AS unlocked
  FROM public.news n
  WHERE n.id = _id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.list_news() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_news(uuid, text) TO anon, authenticated;