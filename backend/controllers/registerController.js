const bcrypt = require("bcrypt");
const { userModel } = require("../models");
const { tokenGenerate } = require("../utils");

const saltRounds = 10;

const register = (req, res) => {
  const { phoneNumber, name, email, password } = req.body;
  let pass;
  bcrypt.hash(password, saltRounds, function (err, hash) {
    pass = hash;
    const user = new userModel({ phoneNumber, name, email, password: pass, verifiedByEmail: true, verifiedByPhone: true});
    user
      .createUser()
      .then((ans) => {
        tokenGenerate(ans).then(({ accessToken, refreshToken }) => {
          res.send({
            accessToken,
            refreshToken,
            found: true,
          });
        });
      })
      .catch((err) => {
        res.send({
          success: false,
          message: err,
        });
      });
  });
};
module.exports = register;
