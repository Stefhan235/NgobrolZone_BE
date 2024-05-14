const bcrypt = require("bcrypt");
const { user } = require("../models");
const { uploader } = require("../helper/cloudinary");
const crypto = require("crypto");
const path = require("path");

exports.createUser = async (payload) => {
    payload.password = bcrypt.hashSync(payload.password, 10);

    if (payload.image) {
        const { image } = payload;

        image.publicId = crypto.randomBytes(16).toString("hex");
        image.name = `${image.publicId}${path.parse(image.name).ext}`;

        const imageUpload = await uploader(image);
        payload.image = imageUpload.secure_url;
    }

    const data = await user.create(payload);

    return data;
};