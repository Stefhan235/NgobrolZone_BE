const { login, googleLogin } = require("../usecase/login");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (email == "" || !email) {
      return next({
        message: "Email Must be filled!!",
        statusCode: 400,
      });
    }

    if (password == "" || !password) {
      return next({
        message: "Password Must be filled!!",
        statusCode: 400,
      });
    }

    //Login Logic
    const data = await login(email, password);

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.googleLogin = async (req, res, next) => {
  try {
    // get the body
    const { access_token } = req.body;

    if (!access_token) {
      return next({
        statusCode: 400,
        message: "Access Token Must be provided",
      });
    }

    // Login with google logic
    const data = await googleLogin(access_token);

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};
