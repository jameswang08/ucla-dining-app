// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://ucladiningapp:ucladiningapp@ucla-dining-app.vzxgxgy.mongodb.net/?retryWrites=true&w=majority";

main().catch((err) => console.log(err)).finally(() => {console.log("Hello World!")});
async function main() {
  await mongoose.connect(mongoDB);
}
