const { refreshTokenModel, userModel } = require("../models");
const jwt = require("jsonwebtoken");

const refreshTokenController = async (req, res) => {
  const { refreshToken: requestToken } = req.query;

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    let refreshToken = await refreshTokenModel.findOne({ token: requestToken });

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    if (refreshTokenModel.verifyExpiration(refreshToken)) {
      refreshTokenModel
        .findByIdAndRemove(refreshToken._id, { useFindAndModify: false })
        .exec();

      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }
    userModel.findById(refreshToken.user).then((userObject) => {
      let newAccessToken = jwt.sign(
        { id: refreshToken.user, email: userObject.email },
        process.env.JWT_ACCESS_SECRET,
        {
          expiresIn: process.env.JWT_ACCESS_EXPIRATION,
        }
      );
      return res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: refreshToken.token,
      });
    });
  } catch (err) {
    return res.status(500).send({ message: "err" });
  }
};

module.exports = refreshTokenController;
