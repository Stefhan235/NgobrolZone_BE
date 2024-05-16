const {
  getUserByEmail,
  getGoogleAccessTokenData,
} = require("../repository/login");
const bcrypt = require("bcrypt");
const { createToken } = require("./util");
const { createUser } = require("../repository/register");

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

exports.googleLogin = async (accessToken) => {
  // validate token and get the data from google
  const googleData = await getGoogleAccessTokenData(accessToken);

  // get is there have any existing user with email
  let user = await getUserByEmail(googleData?.email);
  if (!user) {
    user = await createUser({
      email: googleData?.email,
      password: "",
      name: googleData?.name,
      picture: googleData?.picture,
    });
  }

  // Delete object password from user
  delete user?.dataValues?.password;

  // CreateToken
  const data = createToken(user);

  return data;
};
