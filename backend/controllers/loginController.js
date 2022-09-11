const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { userModel } = require("../models");
const { tokenGenerate } = require("../utils");

const login = async (req, res) => {
  const { email, password } = req.body;

  userModel
    .findOne({ email })
    .then((ans) => {
      if (ans) {
        bcrypt.compare(password, ans.password, function (err, result) {
          if (result == true) {
            tokenGenerate(ans).then(({ accessToken, refreshToken }) => {
              res.send({
                accessToken,
                refreshToken,
                found: true,
                user: ans,
              });
            });
          } else {
            return res.status(400).json({
              error: "Email or Password does not match",
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({
        err: err,
      });
    });
};

module.exports = login;
