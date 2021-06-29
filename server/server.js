const app = require("./app");
const mongoose = require("mongoose");

const config_file = require("dotenv");
config_file.config({ path: "./config.env" });
const db = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);

mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((res) => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("Something Went Error. DB ");
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("App running on port " + port + "...");
});
