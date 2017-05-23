WITH user_id AS (
  INSERT INTO public.users (
    email, encrypted_password, first_name, last_name, created_at, updated_at)
  VALUES ('admin@admin.ru', 'password', 'Admin', 'Admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  RETURNING id
)
, link_ids AS (
    INSERT INTO public.folders(name, user_id, created_at, updated_at)
    VALUES ('Основные', (SELECT * FROM user_id), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
           ('Дополнительные', (SELECT * FROM user_id), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING id
)

INSERT INTO public.links(name, url, folder_id, created_at, updated_at)
   VALUES ('Хабр', 'http://habrahabr.ru', (SELECT * FROM link_ids LIMIT 1), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
          ('РИА', 'http://ria.ru', (SELECT * FROM link_ids LIMIT 1), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
