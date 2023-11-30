const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const UserModel = require('./models/users');
const TruckModel = require('./models/trucks');
const ReviewModel = require('./models/reviews');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());

// Set up mongoose connection
mongoose.set("strictQuery", false);
const mongoDB = process.env.secretURL;

main().catch((err) => console.log(err)).finally(() => {console.log("Hello World!")});
async function main() {
  await mongoose.connect(mongoDB);

  /*
  let user = await UserModel.getUserByName('test1');
  let truck = await TruckModel.createTruck("test_truck2", "another blurb", "some_image_path");
  let review = await ReviewModel.createReview(test1._id, truck._id, { waitTime: 5, rating: 4 }, { waitTime: 10, rating: 5 }, null, null);
  */
}

app.use(express.json())

app.get("/", async (req, res) => {
  res.send("Hello World")
})

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username, password });
  if (user) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.json({ success: false, message: 'Invalid username or password' });
  }
})

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
