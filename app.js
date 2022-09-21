const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); //we are including these headers so that any client can access the api, we can also be ssleective by replacing the * with ex: http://keshab.com
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    //Options is a request that a browser sends when we send a post or put request,
    res.header("Access-Control-Allow-Method", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

const teacherRoute = require("./api/routes/teacherRoute");
const studentRoute = require("./api/routes/studentRoute");
const favRoute = require("./api/routes/favRoute");

mongoose.connect(
  "mongodb+srv://Guest:123456%40guest@cluster0.tovkhmu.mongodb.net/?retryWrites=true&w=majority"
);

app.use("/teacher", teacherRoute);
app.use("/student", studentRoute);
app.use("/fav", favRoute);
module.exports = app;
