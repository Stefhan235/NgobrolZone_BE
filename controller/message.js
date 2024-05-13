const messageUsecase = require("../usecase/message");

exports.getMessages = async (req, res, next) => {
    try {
        const data = await messageUsecase.getMessages();
        res.status(200).json({
            message: "SUCCESS",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.createMessage = async (req, res, next) => {
    try {
        const { message, user_id } = req.body;
        if (!message || message == "") {
            return next({
                message: "Message cant be empty",
                statusCode: 400,
            });
        }
        if (!user_id || user_id == "") {
            return next({
                message: "User ID cant be empty",
                statusCode: 400,
            });
        }

        const data = await messageUsecase.createMessage({
            message,
            user_id,
        });

        // Emit event
        req.io.emit("message", message);

        res.status(201).json({
            message: "SUCCESS",
            data,
        });
    } catch (error) {
        next(error);
    }
};
