const { sendSMS } = require("../utils");
const { generateOTP } = require("../utils");

const sendOTPController = (req, res) => {
  const { phoneNumber } = req.body;
  console.log(phoneNumber);
  const otp = generateOTP();
  sendSMS(phoneNumber, otp)
    .then((msg) => {
      return res.json({
        message: msg,
      });
    })
    .catch((msg) => {
      return res.json({
        message: msg,
      });
    });
};

module.exports = sendOTPController;
