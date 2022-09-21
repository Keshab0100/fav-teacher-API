const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/auth_user");
const userController = require("../controller/studentController");

router.post("/signup", userController.user_signup);

router.post("/login", userController.user_login);

router.delete("/:userId", checkAuth, userController.user_delete);

router.post("/fav/:id", checkAuth, userController.add_fav);
module.exports = router;
