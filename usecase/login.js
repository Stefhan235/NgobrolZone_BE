const { getUserByEmail } = require("../repository/auth");
const bcrypt = require("bcrypt");
const { createToken } = require("./util");

exports.login = async (email, password) => {
  //Get User
  let user = await getUserByEmail(email);

  if (!user) {
    throw new Error(`User is not found`);
  }

  // compare password
  const isValid = await bcrypt.compare(password, user?.password);
  if (!isValid) {
    throw new Error(`Wrong Password`);
  }
  //delete Password
  if (user?.dataValues?.password) {
    delete user?.dataValues?.password;
  } else {
    delete user?.password;
  }

  // CreateToken
  const data = createToken(user);

  return data;
};
