const { sendMail, generateOTP } = require("../utils");

const sendMailController = async (req, res) => {
  const { email } = req.body;
  sendMail(email, generateOTP());
  res.send({
    message: "Email sent",
  });
};

module.exports = sendMailController;
