# Bookmarks

#### Запуск (development):
1. Установить зависимости с помощью Glide
```bash
glide install
```
2. Создать папку build
  * создать и заполнить файл build/config.yml по шаблону из config.yml.example
  * создать файл build/secret.key и записать в него secret_key
3. Создать базу в postgresql с названием указанным в build/config.yml
4. Выполнить
```bash
psql -U username -d db_name -a -f sql_db.sql
psql -U username -d db_name -a -f seed_db.sql
```
5. Построить проект и запустьи его в папке build
```bash
go build -o ./build/bookmarks && cd ./build/ && ./bookmarks
```
6. Перейти в папку frontend
```bash
cd frontend
```
7. Установить зависимости для npm
```bash
npm install
```
8. Запустить webpack
```bash
npm start
```


#### TODO:
1. Заменить gin на chi или на что-либо другое
2. Привести app папки в порядок:
  * domain
  * interfaces
  * usecases
  * infrastructure

3. Добавить проверку на длину пароля при регистрации
4. Подумать над проверкой валидации на уникальность email при регистрации. Может её делать при вставки записи в базу?
5. Совершенно точно переделать систему валидации
6. Может отказаться от Validator?
7. Переделать работу с формами во frontend (edit_folder и new_folder)
8. Сделать рефакторинг backend'а и frontend'a
9. Добавить сериалайзеры в usecase
