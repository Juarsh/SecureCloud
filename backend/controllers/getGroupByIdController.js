const { groupModel } = require("../models");

const getGroupController = (req, res) => {
  const { id } = req.params;
  groupModel
    .findOne(id)
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
};

module.exports = getGroupController;
