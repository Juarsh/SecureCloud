const refreshTokenSchema = require('../Schema/refreshToken')
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

refreshTokenSchema.statics.createToken = async function (user) {
  return new Promise((resolve, reject) => {
    let expiredAt = new Date();

    expiredAt.setSeconds(
      expiredAt.getSeconds() + process.env.JWT_REFRESH_EXPIRATION
    );

    let _token = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION,
    });

    let _object = new this({
      token: _token,
      user: user._id,
      expiryDate: expiredAt.getTime(),
    });
    _object.save().then((refreshToken) => {
      return resolve(refreshToken.token);
    });
  })
};

refreshTokenSchema.statics.verifyExpiration = (token) => {
  return token.expiryDate.getTime() < new Date().getTime();
}

const refreshTokenModel = mongoose.model("RefreshToken", refreshTokenSchema);

module.exports = refreshTokenModel;