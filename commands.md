****DONT FORGET TO USE DOTENV!!!******
CREATE USER czhao WITH PASSWORD 'nAu6N6Ng$BaAM$K' CREATEDB;

***USERS***
npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string
npx sequelize seed:generate --name demo-user
psql react_solo -c 'SELECT * FROM "Users"'

***CARS***
npx sequelize model:generate --name Car --attributes ownerId:integer,price:integer,description:text,brand:string,model:string,city:string,state:string,imageURL:string
npx sequelize seed:generate --name CarsSeeds

***REVIEWS***
npx sequelize model:generate --name Review --attributes userId:integer,carId:integer,rating:integer,content:text
npx sequelize seed:generate --name ReviewsSeeds

***MISC***
npx dotenv sequelize db:create
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
npx dotenv sequelize db:seed:undo:all

***To drop and create db***
npx dotenv sequelize db:drop
npx dotenv sequelize db:create








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





'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Collections', [
      {
        ownerId: 10,
        name: "My Most Prized Possession",
        description: "Times are tough (lost my snazzy lawyer gig) and I need to rent out my baby to pay the bills. The interior is quite snug. Inside are high-quality materials, a hushed cabin, and a refined-sounding engine. Acceleration is quick, and fuel economy is commendable.",
        brand: "Lexus",
        model: "IS 300",
        city: "Greendale",
        state: "CO",
        imageURL: "https://crdms.images.consumerreports.org/c_lfill,w_2000,q_auto,f_auto/prod/cars/chrome/white/2012LEX006b_640_01"
      },
      {
        ownerId: 11,
        name: 1,
        description: new Date(),
        brand: "Lexus",
        model: "IS 300",
        city: "Greendale",
        state: "CO",
        imageURL: "https://crdms.images.consumerreports.org/c_lfill,w_2000,q_auto,f_auto/prod/cars/chrome/white/2012LEX006b_640_01"
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Cars', null, {});
  }
};
