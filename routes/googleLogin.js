const express = require("express");
const router = express.Router();
const { googleLogin } = require("../controller/login");

router.post("/", googleLogin);

module.exports = router;
