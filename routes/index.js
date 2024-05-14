const express = require("express");
const router = express.Router();
const message = require("./message");
const profile = require("./profile");

router.use("/messages", message);
router.use("/profiles", profile);

module.exports = router;
