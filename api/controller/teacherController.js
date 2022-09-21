const bcrypt = require("bcrypt");
const User = require("../model/teacher");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

exports.get_teacher = (req, res, next) => {
  User.find()
    .exec()
    .then((data) => {
      res.json({
        message: "all teachers are",
        details: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.teacher_add = (req, res, next) => {
  //Checking if user already exists
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        //Checking the length bcoz user won't return a null value if user doesn't exist rather it will return an empty array
        return res.status(409).json({
          message: "User already exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: hash,
            });
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
          }
        });
        //the variable 10 is the no. of salting rounds so that if the user password is very simple it can't be looked up it the dictionary table
      }
    });
};
