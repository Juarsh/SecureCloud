const { groupModel } = require("../models");

const getAllGroupController = (req, res) => {
  const { email } = req.query;
  if(email === 'admin') {
    groupModel
    .find({ deleted: false })
    .then((ans) => {
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
  } else {
    groupModel
      .find({ memberEmails: email, deleted: false })
      .then((ans) => {
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
  }
};

module.exports = getAllGroupController;
