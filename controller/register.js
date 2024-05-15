const { registerUser } = require("../usecase/register");

exports.register = async (req, res, next) => {
    try {

        const { email, password, name } = req.body;

        const image = req?.files?.image;

        if (email == "" || !email) {
            return next({
                message: "Email must be filled!",
                statusCode: 400,
            });
        }
        if (password == "" || !password) {
            return next({
                message: "Password must be filled!",
                statusCode: 400,
            });
        }
        if (name == "" || !name) {
            return next({
                message: "Name must be filled!",
                statusCode: 400,
            });
        }

        const data = await registerUser({
            email,
            password,
            name,
            image,
        });

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};