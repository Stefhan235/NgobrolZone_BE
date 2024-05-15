const express = require("express");
const router = express.Router();
const messageController = require("../controller/message");
const { authMiddleware } = require("../middleware/auth");

router
    .route("/")
    .get(authMiddleware, messageController.getMessages)
    .post(authMiddleware, messageController.createMessage);

module.exports = router;
