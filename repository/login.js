const { user } = require("../models");

exports.getUserByEmail = async (email) => {
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
