# BruinEats by BPlate Enjoyers

BruinEats is a web app designed with the purpose of showing and providing ratings
and reviews for the food trucks offered to UCLA students with meal plans. This also
allows students to view all food trucks in one place, as the UCLA dining website
only shows the food trucks available for each day. Our rating system is tailored to
make the reviews as helpful to students as possible. Each reviewer can enter how
long they waited in line for the food truck as well as which meal period (lunch,
dinner, or late night) they are leaving a review for, which can help other students
decide whether to wait in line for a certain food truck during a certain meal period
or not. Users can also sort, filter, and like reviews.

## Installation and Running the Code

### Clone the git repository
```
git clone https://github.com/jameswang08/ucla-dining-app/
cd ucla-dining-app
```

### Frontend setup
Beginning from the root directory, run the following:
```
cd frontend
npm install
npx tailwindcss -i ./src/App.css -o ./dist/output.css --watch
npm run dev
```
Open the link from running <code>npm run dev</code> in your preferred browser
to view the BruinEats web app.

### Backend setup
Beginning from the root directory, run <code>cd backend</code>
Create a <code>.env</code> file in the following format, replacing <code>"mongodb_url"</code> with the database connection string: 
```
secretURL="mongodb_url"
```
Run the following: 
```
npm install
npm start
```
