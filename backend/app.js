const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const UserModel = require('./models/users');
const TrucksModel = require('./models/trucks');
require('dotenv').config();

const app = express();

// Set up mongoose connection
mongoose.set("strictQuery", false);
const mongoDB = process.env.secretURL;

main().catch((err) => console.log(err)).finally(() => {console.log("Hello World!")});
async function main() {
  await mongoose.connect(mongoDB);

  // let query1 = await UserModel.find({ username: "test2" });
  // let query2 = await UserModel.getUserByName("test2");
  // console.log(query1);
  // console.log(query2);

  // let user = new UserModel({
  //   username: 'test2',
  //   email: 'test2@gmail.com',
  //   password: 'test',
  // });

  // user
  //   .save()
  //   .then((doc) => {
  //     console.log(doc);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });
}

app.use(express.json())

app.get("/", async (req, res) => {
  res.send("Hello World")
})

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    // User with the provided username and password found
    return res.status(200).json({ success: true });
  } else {
    // User not found or incorrect credentials
    return res.status(200).json({ success: false });
  }
})

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
