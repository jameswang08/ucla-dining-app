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
  await TruckModel.createTruck("Kalamaki", "another blurb");
  await TruckModel.createTruck("Baja California", "another blurb");
  await TruckModel.createTruck("BittieBitez Mini-Donuts", "another blurb");
  await TruckModel.createTruck("StopBye", "another blurb");
  await TruckModel.createTruck("Sugo Italiano", "another blurb");
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
  if (req.body.sortMethod === "latest") {
    const reviews = await ReviewModel.find({ truckname: req.params.truckname })
      .sort({ date: 1 })
      .exec();
    res.json({ reviews });
  } else {
    const reviews = await ReviewModel.find({
      truckname: req.params.truckname,
    }).exec();
    res.json({ reviews });
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
