const express = require("express");
const { getProfiles } = require("../controller/profile");
const { authMiddleware } = require("../middleware/auth");
const router = express.Router();

router.get("/", authMiddleware, getProfiles);

module.exports = router;