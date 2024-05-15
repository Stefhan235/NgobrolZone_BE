const { getProfiles } = require("../usecase/profile");

exports.getProfiles = async (req, res, next) => {
    try {
        // get user by id
        const data = await getProfiles(req?.user?.id)

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};