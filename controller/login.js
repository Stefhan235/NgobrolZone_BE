const { login } = require("../usecase/login");

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
