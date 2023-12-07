const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const UserModel = require("./models/users");
const TruckModel = require("./models/trucks");
const ReviewModel = require("./models/reviews");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

// Set up mongoose connection
mongoose.set("strictQuery", false);
const mongoDB = process.env.secretURL;

main()
  .catch((err) => console.log(err))
  .finally(() => {
    console.log("Hello World!");
  });
async function main() {
  await mongoose.connect(mongoDB);

  /*
  await TruckModel.createTruck("Kalamaki", "Kalamaki Greek Street Food \
   specializes in fine Greek food, including gyros, salads, yogurts, and \
    smoothies.");

  await TruckModel.createTruck("Pinch of Flavor", "Pinch of Flavor specializes \
   in homemade seafood dishes, with options like shrimp tempura bowls or beef \
   or chicken teriyaki.");

  await TruckModel.createTruck("BittieBitez Mini-Donuts", "BittieBitez \
  Mini-Donuts is a dessert food truck specializing in freshly-made mini \
  donuts with a variety of toppings including chocolate, oreo, and Fruity \
  Pebbles. This dessert truck is a favored late-night option for those with \
   a sweet tooth.");

  await TruckModel.createTruck("StopBye", "StopBye Indonesian Fusion specializes \
  in Indonesian fusion food featuring ingredients from “Spice Island”, such as \
  lemongrass fried chicken sandwiches or chicken mee goreng (Indonesian chow mein).");

  await TruckModel.createTruck("Sugo Italiano", "Sugo Italiano is an authentic Italian \
  food truck, and the best place to get pasta to-go. The menu features items such as four \
  cheese Italian ravioli and pasta vodka pink sauce.");
  */
}

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Hello World");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username, password });
  if (user) {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.json({ success: false, message: "Invalid username or password" });
  }
});

app.post("/createaccount", async (req, res) => {
  const { email, username, password, firstname, lastname } = req.body;
  const user = await UserModel.getUserByUsername(username);
  if (user) {
    res.json({ success: false, message: "Invalid username" });
  }
  await UserModel.createUser(firstname, lastname, username, email, password);
  res.json({ success: true, message: "Account creation successful" });
});

app.post("/postreview", async (req, res) => {
  const { username, truckname, meal, waitTime, rating, review } = req.body;
  await ReviewModel.createReview(
    username,
    truckname,
    meal,
    waitTime,
    rating,
    review
  );
  res.json({ success: true, message: "Posting review successful" });
});

app.post("/setfavorite", async (req, res) => {
  const { username, favorite } = req.body;
  const user = await UserModel.getUserByUsername(username);
  await user.setFavorite(favorite);
  res.json({ success: true, message: "Update to favorite successful" });
});

app.get("/users/:username", async (req, res) => {
  let user = await UserModel.findOne({ username: req.params.username }).lean();
  delete user["password"];
  res.json(user);
});

app.get("/trucks/:truckname", async (req, res) => {
  const truck = await TruckModel.getTruckByName(req.params.truckname);
  res.json({ truck });
});

app.post("/trucks/:truckname", async (req, res) => {
  //If there are filters
  console.log(req.body.filters);
  if( req.body.filters !== undefined && req.body.filters.length !== 0){
    if (req.body.sortMethod === "latest") {
      const reviews = await ReviewModel.find({ truckname: req.params.truckname, meal: {$in: req.body.filters}} )
        .sort({ date: -1 })
        .exec();
      res.json({ reviews });
    } else if (req.body.sortMethod === "earliest") {
      const reviews = await ReviewModel.find({ truckname: req.params.truckname, meal: {$in: req.body.filters}} )
      .sort({ date: 1 })
      .exec();
      res.json({ reviews });   
    } else if (req.body.sortMethod === "popularity") {
      const reviews = await ReviewModel.find({ truckname: req.params.truckname, meal: {$in: req.body.filters}} )
      .sort({ likes: -1 })
      .exec();
      res.json({ reviews }); 
    } else {
      const reviews = await ReviewModel.find({
        truckname: req.params.truckname, meal: {$in: req.body.filters}
      }).exec();
      res.json({ reviews });
    }
  }
  else{
    if (req.body.sortMethod === "latest") {
      const reviews = await ReviewModel.find({ truckname: req.params.truckname })
        .sort({ date: -1 })
        .exec();
      res.json({ reviews });
    } else if (req.body.sortMethod === "earliest") {
      const reviews = await ReviewModel.find({ truckname: req.params.truckname })
      .sort({ date: 1 })
      .exec();
      res.json({ reviews });   
    } else if (req.body.sortMethod === "popularity") {
      const reviews = await ReviewModel.find({ truckname: req.params.truckname })
      .sort({ likes: -1 })
      .exec();
      res.json({ reviews }); 
    } else {
      const reviews = await ReviewModel.find({
        truckname: req.params.truckname,
      }).exec();
      res.json({ reviews });
    }
  }
});

app.get("/alltrucks", async (req, res) => {
  const trucks = await TruckModel.find({});
  res.json(trucks);
});

app.get("/alltrucknames", async (req, res) => {
  const trucknames = await TruckModel.getTruckNames();
  res.json(trucknames);
});

app.patch("/updatelike", async (req, res) => {
  const user = await UserModel.getUserByUsername(req.body.username);
  const liked = await user.toggleLike(
    new mongoose.Types.ObjectId(req.body.reviewId)
  );
  res.json({
    success: true,
    liked: liked,
    message: "Update to like successful",
  });
});

app.get("/likes/:username/reviewid/:review", async (req, res) => {
  const user = await UserModel.getUserByUsername(req.params.username);
  const likes = user.likes;
  if (likes.indexOf(req.params.review) == -1) res.json({ success: false });
  else res.json({ success: true });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
