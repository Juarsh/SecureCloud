const { userModel } = require("../models");

const getAllUserController = (req, res) => {
  userModel
    .find()
    .then((ans) => {
      console.log(ans);
      if (ans) {
        return res.send({
          Object: ans,
          found: true,
        });
      } else
        res.send({
          found: false,
        });
    })
    .catch((err) => {
      console.log(err);
      res.send({
        err: err,
      });
    });
};

module.exports = getAllUserController;
