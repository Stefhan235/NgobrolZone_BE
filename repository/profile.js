const { user } = require("../models");

exports.getProfiles = async (payload) => {
    const data = await user.findOne({
        where: { id:payload}
    });
    return data;
};

