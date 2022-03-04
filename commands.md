CREATE USER czhao WITH PASSWORD 'nAu6N6Ng$BaAM$K' CREATEDB;

npx dotenv sequelize db:create

npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string

npx dotenv sequelize db:migrate
 psql react_solo -c '\d "Users"'

npx sequelize seed:generate --name demo-user
  npx dotenv sequelize db:seed:all
  psql react_solo -c 'SELECT * FROM "Users"'






.gitignore (frontend):

# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
.eslintcache

npm-debug.log*
yarn-debug.log*
yarn-error.log*
