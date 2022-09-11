const { refreshTokenModel } = require('../models');
const jwt = require("jsonwebtoken");

const tokenGenerate = (ans) => {
    return new Promise((resolve, reject) => {
        let token = jwt.sign({ id: ans._id, email: ans.email }, process.env.JWT_ACCESS_SECRET, {
            expiresIn: process.env.JWT_ACCESS_EXPIRATION,
        });
        refreshTokenModel.findOne({ user: ans._id }).then((res) => {
            if (res)
                refreshTokenModel.findByIdAndRemove(res._id, { useFindAndModify: false }).exec();
        })
        refreshTokenModel.createToken(ans).then((refreshToken) => {
            const object = {
                accessToken: token,
                refreshToken
            }
            return resolve(object);
        });
    })
}

module.exports = tokenGenerate;