const { message, user } = require("../models");

exports.getMessages = async () => {
    const data = await message.findAll({
        include: { model: user, attributes: { exclude: ["password"] } },
    });
    return data;
};

exports.createMessage = async (payload) => {
    const data = await message.create(payload);
    return data;
};
