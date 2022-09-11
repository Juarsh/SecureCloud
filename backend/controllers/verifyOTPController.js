const { verifyOTP } = require("../utils");

const verifyOTPController = (req, res) => {
  const { otp } = req.body;
  try {
    const isValid = verifyOTP(otp);
    if (isValid)
      return res.json({
        verified: true,
      });
    else
      return res.json({
        verified: false,
      });
  } catch (err) {
    console.error(err);
  }
};

module.exports = verifyOTPController;
