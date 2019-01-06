const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 4000;
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./DB.js");
const businessRoute = require("./business.route");
const path = require("path");

mongoose.promise = global.Promise;
mongoose
  .connect(
    config.DB,
    { useNewUrlParser: true }
  )
  .then(
    () => {
      console.log("Database is connected.");
    },
    err => {
      console.log("Cannot connect to the database." + err);
    }
  );

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/business", businessRoute);
app.use(express.static(path.join(__dirname, "client", "build")));


app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname, "client", "build","index.html"));
})
app.listen(PORT, function() {
  console.log("Server is running on port ", PORT);
});
