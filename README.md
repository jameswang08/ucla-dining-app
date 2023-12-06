# BruinEats by BPlate Enjoyers

BruinEats is a web app designed with the purpose of showing and providing ratings and reviews for the food trucks offered to UCLA students with meal plans. This also allows students
to view all food trucks in one place, as the UCLA dining website only shows the food trucks available for each day. Our rating system is tailored to make the reviews as helpful to
students as possible. Each reviewer can enter how long they waited in line for the food truck as well as which meal period (lunch, dinner, or late night) they are leaving a review for,
which can help other students decide whether to wait in line for a certain food truck during a certain meal period or not. Users can also sort, filter, and like reviews.

## Installation and Running the Code

1. Clone the git repository.
2. Make sure your cwd is your local ucla-dining-app repository.
3. Run the command: <code>cd backend</code>.
4. In backend, run the following:
```
npm install
npm start
```
5. Start a new shell tab.
6. Run the command: <code>cd ../frontend</code>.
7. In frontend, run the following:
```
npm install
npx tailwindcss -i ./src/App.css -o ./dist/output.css --watch
npm run dev
```
8. Open the link from running <code>npm run dev</code> in your preferred browser to view the BruinEats web app.
