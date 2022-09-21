const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/auth_user");
const favController = require("../controller/favController");

router.post("/", checkAuth, favController.addFav);
router.delete("/", checkAuth, favController.removeFav);
router.get("/", favController.mostFav);
module.exports = router;
