CREATE OR REPLACE FUNCTION public.delete_news(_id uuid, _password text DEFAULT NULL)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _row public.news%ROWTYPE;
BEGIN
  SELECT * INTO _row FROM public.news WHERE id = _id;
  IF NOT FOUND THEN
    RETURN false;
  END IF;
  IF _row.is_private = true THEN
    IF _password IS NULL OR _row.password IS DISTINCT FROM _password THEN
      RETURN false;
    END IF;
  END IF;
  DELETE FROM public.news WHERE id = _id;
  RETURN true;
END;
$$;