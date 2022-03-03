CREATE USER czhao WITH PASSWORD 'nAu6N6Ng$BaAM$K' CREATEDB;

npx dotenv sequelize db:create

npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string

npx dotenv sequelize db:migrate
 psql react_solo -c '\d "Users"'

npx sequelize seed:generate --name demo-user
  npx dotenv sequelize db:seed:all
  psql react_solo -c 'SELECT * FROM "Users"'
