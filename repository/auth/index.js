const bcrypt = require("bcrypt");
const crypto = require("crypto");
const path = require("path");
const { uploader } = require("../../helper/cloudinary");

exports.createUser = async (payload) => {
  // encrypt the password
  payload.password = bcrypt.hashSync(payload.password, 10);

  //upload image to cloudinary
  if (payload.photo) {
    const { photo } = payload;

    photo.publicId = crypto.randomBytes(16).toString("hex");

    photo.name = `${photo.publicId}${path.parse(photo.name).ext}`;

    const imageUpload = await uploader(photo);
    payload.photo = imageUpload.secure_url;
  }
  // Save To DB
  const data = await user.create(payload);
  return data;
};

exports.getUserByEmail = async (email) => {
  //Get data From DB
  const data = await user.findAll({
    where: {
      email,
    },
  });

  return data;
};
