const express = require("express");
const router = express.Router();
const message = require("./message");
const login = require("./auth");

router.use("/messages", message);
router.use("/auth", login);
module.exports = router;
