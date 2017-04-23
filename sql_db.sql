CREATE TABLE users (
  id serial NOT NULL,
  email character varying NOT NULL DEFAULT ''::character varying,
  encrypted_password character varying NOT NULL DEFAULT ''::character varying,
  created_at timestamp without time zone NOT NULL,
  updated_at timestamp without time zone NOT NULL,
  CONSTRAINT users_pkey PRIMARY KEY (id)
) WITH (OIDS=FALSE);

ALTER TABLE public.users
  OWNER TO defo;

CREATE UNIQUE INDEX index_users_on_email
  ON public.users
  USING btree
  (email COLLATE pg_catalog."default");

INSERT INTO public.users(
            email, encrypted_password, created_at, updated_at)
    VALUES ('admin@admin.ru', 'password', '2017-04-22 14:27:02.131071', '2017-04-22 14:27:02.131071');