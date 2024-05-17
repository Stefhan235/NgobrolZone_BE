const axios = require("axios");
const { user } = require("../models");

exports.getUserByEmail = async (email, returnError) => {
  //Get data From DB
  const data = await user.findOne({
    where: {
      email,
    },
  });

  if (!data) {
    return null;
  }

  return data.dataValues;
};

exports.getGoogleAccessTokenData = async (accessToken) => {
  const response = await axios.get(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
  );
  return response.data;
};
