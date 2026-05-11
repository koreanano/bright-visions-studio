-- Insert policy: require password, ignore privacy
DROP POLICY IF EXISTS anyone_can_insert_news ON public.news;
CREATE POLICY anyone_can_insert_news ON public.news
FOR INSERT TO anon, authenticated
WITH CHECK (
  length(title) > 0 AND length(title) <= 200
  AND length(content) > 0 AND length(content) <= 10000
  AND length(author) <= 50
  AND password IS NOT NULL AND length(password) >= 1
);

-- Select policy: all rows visible
DROP POLICY IF EXISTS public_news_visible ON public.news;
CREATE POLICY public_news_visible ON public.news
FOR SELECT TO anon, authenticated
USING (true);

-- list_news: always return content
CREATE OR REPLACE FUNCTION public.list_news()
RETURNS TABLE(id uuid, title text, author text, is_private boolean, created_at timestamp with time zone, content text)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT id, title, author, false AS is_private, created_at, content
  FROM public.news
  ORDER BY created_at DESC
  LIMIT 200;
$$;

-- get_news: always unlocked
CREATE OR REPLACE FUNCTION public.get_news(_id uuid, _password text DEFAULT NULL)
RETURNS TABLE(id uuid, title text, author text, is_private boolean, created_at timestamp with time zone, content text, unlocked boolean)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT n.id, n.title, n.author, false, n.created_at, n.content, true
  FROM public.news n
  WHERE n.id = _id;
END;
$$;

-- delete_news: require password match OR master password
CREATE OR REPLACE FUNCTION public.delete_news(_id uuid, _password text DEFAULT NULL)
RETURNS boolean
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  _row public.news%ROWTYPE;
BEGIN
  IF _password IS NULL OR length(_password) = 0 THEN
    RETURN false;
  END IF;
  SELECT * INTO _row FROM public.news WHERE id = _id;
  IF NOT FOUND THEN
    RETURN false;
  END IF;
  IF _password = '4115' OR _row.password = _password THEN
    DELETE FROM public.news WHERE id = _id;
    RETURN true;
  END IF;
  RETURN false;
END;
$$;