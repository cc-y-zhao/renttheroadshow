# Rent The Roadshow (RTRS)

Rent The Roadshow ("RTRS") is a clone of Airbnb, but for cars! If you're interested in renting a car, and/or listing your own car for rent, RTRS is the place to be!

### To use this repo:

1. Clone this repo
    * `git clone git@github.com:cc-y-zhao/renttheroadshow.git`

2. Install dependencies from the root directory
    * `npm install`

3. Create a POSTGRESQL user with CREATEDB and PASSWORD in PSQL
    * `CREATE USER <name> WITH CREATEDB PASSWORD '<password>'`

4. Create a `.env` file in the backend directory based on the `.env.example` found within the respective directory

5. Enter your psql user's name and password information into your `.env` file along with your desired database name, a secured combination of characters for your JWT_SECRET, and your desired PORT (preferably 5000)

6. Add the following proxy to your package.json file within your frontend directory, replacing or keeping the 5000 port to match your PORT configuration found in your `.env` file.
    * `"proxy": "http://localhost:5000"`

7. Create Databse, Migrate, and Seed models:
    * `npx dotenv sequelize db:create`
    * `npx dotenv sequelize db:migrate`
    * `npx dotenv sequelize db:seed:all`

8. Start the services in the backend directory
    * `npm start`

9. Start the services in the frontend directory, which should open the app in your default browser. If not, navigate to http://localhost:3000.
    * `npm start`

10. You can use the Demo Login or create an account to being using RTRS.

### Features:

Logged in users can perform the following actions:

    * View/Create/Edit/Delete rental listings
    * View/Create/Edit/Delete rental reviews
