const { getProfiles } = require("../usecase/profile");

exports.getProfiles = async (req, res, next) => {
    try {
        const { user_id } = req.params
        // get user by id
        const data = await getProfiles(+user_id)

        res.status(200).json({
            message: "Success",
            data,
        });
    } catch (error) {
        next(error);
    }
};