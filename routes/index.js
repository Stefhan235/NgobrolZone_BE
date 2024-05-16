const express = require("express");
const router = express.Router();
const message = require("./message");
const login = require("./login");
const profile = require("./profile");
const register = require("./register");
const googleLogin = require("./googleLogin");

router.use("/messages", message);
router.use("/profiles", profile);
router.use("/login", login);
router.use("/register", register);
router.use("/google-login", googleLogin);

module.exports = router;
