const User = require("../model/favList.js");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

exports.addFav = (req, res, next) => {
  const authHeader = req.headers.authorization.split(".")[1];
  const uId = JSON.parse(atob(authHeader)).userId;
  User.find({
    sid: uId,
    tid: req.body.tid,
  })
    .exec()
    .then((data) => {
      if (data.length < 1) {
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          sid: uId,
          tid: req.body.tid,
        });
        console.log(user);
        user
          .save()
          .then((result) => {
            return res.status(200).json({
              message: "user created succesfully",
              id: result._id,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
          });
      } else {
        res.status(500).json({
          message: "Teacher already in fav list",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.removeFav = (req, res, next) => {
  const authHeader = req.headers.authorization.split(".")[1];
  const uId = JSON.parse(atob(authHeader)).userId;
  User.deleteOne({ sid: uId, tid: req.body.tid })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Teacher removed from fav list",
      });
      console.log("delete ho gaya");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.mostFav = (req, res, next) => {
  User.aggregate([]);
};
