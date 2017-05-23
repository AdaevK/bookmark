CREATE TABLE users (
  id serial NOT NULL,
  email character varying NOT NULL DEFAULT ''::character varying,
  first_name character varying,
  last_name character varying,
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


CREATE TABLE folders (
  id serial NOT NULL,
  user_id integer REFERENCES users(id),
  name character varying NOT NULL DEFAULT ''::character varying,
  created_at timestamp without time zone NOT NULL,
  updated_at timestamp without time zone NOT NULL,
  CONSTRAINT folders_pkey PRIMARY KEY (id)
) WITH (OIDS=FALSE);

ALTER TABLE public.folders
  OWNER TO defo;

CREATE INDEX index_folders_on_user_id
  ON public.folders
  USING btree
  (user_id);

CREATE TABLE links (
  id serial NOT NULL,
  name character varying NOT NULL DEFAULT ''::character varying,
  url character varying NOT NULL DEFAULT ''::character varying,
  folder_id integer REFERENCES folders(id),
  created_at timestamp without time zone NOT NULL,
  updated_at timestamp without time zone NOT NULL,
  CONSTRAINT links_pkey PRIMARY KEY (id)
) WITH (OIDS=FALSE);

ALTER TABLE public.links
  OWNER TO defo;

CREATE INDEX index_links_on_folder_id
  ON public.links
  USING btree
  (folder_id);