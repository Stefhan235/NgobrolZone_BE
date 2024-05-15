const { getTokenFromHeaders, extractToken } = require("../helper/auth");
const { getProfiles } = require("../usecase/profile");

exports.authMiddleware = async (req, res, next) => {
    try {
        // get token from headers
        const token = getTokenFromHeaders(req?.headers);

        // extract token to get the user id
        const extractedToken = extractToken(token);

        const user = await getProfiles(extractedToken?.id);

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};
