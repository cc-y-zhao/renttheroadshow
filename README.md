# Rent The RoadShow (RTRS)

<img width="1023" alt="image" src="https://raw.githubusercontent.com/cc-y-zhao/Book-In-Style/misc_v5/react-app/public/images/ReadMe/book_homepage.png">

[Rent The RoadShow](https://renttheroadshow.herokuapp.com/) is an online destination where users can explore cars, list their cars for rent, and leave reviews. 

## Meet the developer behind Book-In-Style~

Rent The Roadshow is brought to you by [Cecilia Zhao](https://www.linkedin.com/in/ceciliazh/). Thank you for visiting!

---

# Index


### Navigating this ReadMe

- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Features](#features)

<br>

# Technologies Used

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="javascript" width="60" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" alt="react" width="60" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" alt="redux" width="60" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" alt="sqlalchemy" width="60" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="60" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg" alt="html5" width="60" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg" alt="css3" width="60" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="git" width="60" />

<br>

# Getting Started

<details>
<summary>How do I run this project?</summary>

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

</details>

<details>
<summary>How do I log in as a Demo User?</summary>
On the log in page, click "Demo Login".
   
   
</details>

<br>

# Features

## Book Appointments
<img src="https://github.com/cc-y-zhao/Book-In-Style/blob/misc_v5/react-app/public/gifs/booking_demo.gif?raw=true" width="580" height="350" />
<!-- ![Alt Text](https://github.com/cc-y-zhao/Book-In-Style/blob/misc_v5/react-app/public/videos/booking_demo.gif?raw=true)    -->

Users can book, update, and delete their appointments.
   
## Leave Reviews
<img src="https://github.com/cc-y-zhao/Book-In-Style/blob/misc_v5/react-app/public/gifs/review_demo.gif?raw=true" width="580" height="350" />

Users can create, update, and delete reviews.
   
## Add to Favorites
<img src="https://github.com/cc-y-zhao/Book-In-Style/blob/misc_v5/react-app/public/gifs/favorite.gif?raw=true" width="580" height="350" />

Users can add and delete favorites.
   
## List Businesses 
<!-- <img src="https://github.com/cc-y-zhao/Book-In-Style/blob/misc_v5/react-app/public/gifs/favorite.gif?raw=true" width="580" height="350" /> -->

Users can list businesses, add services, as well as edit and delete their listings. 


<br>

