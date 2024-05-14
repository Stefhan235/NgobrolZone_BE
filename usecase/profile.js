const { getProfiles } = require("../repository/profile");

exports.getProfiles = async (id) => {
    // get the user
    let data = await getProfiles(id);
    if (!data) {
        throw new Error(`User is not found!`);
    }

    // delete password
    if (data?.dataValues?.password) {
        delete data?.dataValues?.password;
    } else {
        delete data?.password;
    }

    return data;
};