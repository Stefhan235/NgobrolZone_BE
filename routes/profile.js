const express = require("express");
const { getProfiles } = require("../controller/profile");
const router = express.Router();

router.get("/:user_id", getProfiles);

module.exports = router;
