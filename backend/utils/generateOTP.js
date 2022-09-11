const speakeasy = require("speakeasy");

const generateOTP = () => {
    const otp = speakeasy.totp({
        secret: process.env.OTP_SECRET.base32,
        encoding: 'base32',
        digits: 4
    });
    return otp;
}

module.exports = generateOTP;