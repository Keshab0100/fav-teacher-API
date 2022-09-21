const express = require("express");
const router = express.Router();
const userController = require("../controller/teacherController");

router.post("/signup", userController.teacher_add);

router.get("/", userController.get_teacher);

module.exports = router;
