require("dotenv").config();

const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();
const port = process.env.PORT || 3000;

const httpServer = createServer(app);
const options = {
    cors: {
        origin: "*",
        methods: "*",
    },
};
const io = new Server(httpServer, options);

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: process.env.NODE_ENV == "development" ? "./tmp" : "/tmp", //gcp tmp file
    })
);
app.use(express.urlencoded({ extended: true }));

app.use(async function (req, res, next) {
    req.io = io;
    next();
});

const router = require("./routes")
app.use("/api", router);

app.use("*", (req, res) => {
    res.status(404).json({
        data: null,
        message: "Route not found",
    });
});

app.use((err, req, res, next) => {
    let statusCode = 500;
    let message = "Internal Server Error";

    if (err.statusCode) {
        statusCode = err.statusCode;
    }
    if (err.message) {
        message = err.message;
    }

    res.status(statusCode).json({
        data: null,
        message,
    });
});

io.on("connection", (socket) => {
    console.log(socket.id + " connected!");

    /* ... */
    socket.on("disconnect", (reason) => {
        console.log(socket.id + " disconnected because " + reason);
    });

    socket.on("typing", () => {
        console.log("aku ditrigger");
        io.emit("ontyping");
    });
});

app.listen(port, () => {
    console.log(`-> Local: http://localhost:3000/`);
});
