const express = require("express");
const router = express.Router();
const message = require("./message");
const login = require("./auth");
const profile = require("./profile");

router.use("/messages", message);
router.use("/profiles", profile);
router.use("/auth", login);
module.exports = router;
