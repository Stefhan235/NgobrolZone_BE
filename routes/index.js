const express = require("express");
const router = express.Router();
const message = require("./message");
const profile = require("./profile");
const register = require("./register")

router.use("/messages", message);
router.use("/profiles", profile);
router.use("/register", register);

module.exports = router;
