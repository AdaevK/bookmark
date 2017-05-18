WITH user_id as (
  INSERT INTO public.users (
    email, encrypted_password, first_name, last_name, created_at, updated_at)
  VALUES ('admin@admin.ru', 'password', 'Admin', 'Admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  RETURNING id
)

INSERT INTO public.folders(name, user_id, created_at, updated_at)
    VALUES ('Основные', (SELECT * FROM user_id), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
           ('Дополнительные', (SELECT * FROM user_id), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
