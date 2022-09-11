const speakeasy = require("speakeasy");

const verifyOTP = (otp) => {
    return speakeasy.totp.verify({
        secret: process.env.OTP_SECRET.base32,
        encoding: 'base32',
        token: otp,
        window: 6,
        digits: 4
    });
}

module.exports = verifyOTP;

