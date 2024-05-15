const jsonwebtoken = require("jsonwebtoken");
const { createUser } = require("../repository/register");


exports.registerUser = async (payload) => {
    let user = await createUser(payload);

    delete user.dataValues.password;

    const jwtPayload = {
        id: user.id,
    };

    const token = jsonwebtoken.sign(jwtPayload, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    const data = {
        user,
        token,
    };

    return data;
};