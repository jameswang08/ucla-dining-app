require('dotenv').config();

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = secretURL;

main().catch((err) => console.log(err)).finally(() => {console.log("Hello World!")});
async function main() {
  await mongoose.connect(mongoDB);
}
