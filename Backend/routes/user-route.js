const express = require("express");
const router = express.Router();
const authentication = require("../controllers/user-controller");

router.route("/").get(authentication.home);
router.route("/register").post(authentication.register);
router.route("/login").post(authentication.login);
router.route("/delete").delete(authentication.deleteUser);
router.route("/update").put(authentication.updateUser);

module.exports = router;
