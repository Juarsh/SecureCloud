const { groupModel } = require("../models");

const deleteGroupController = (req, res) => {
  const { groupId, deletedBy } = req.query;
  groupModel
    .findById(groupId)
    .then((ans) => {
      if (ans) {
        ans.deleted = true;
        ans.deletedBy = deletedBy;
        ans.save().then(() => {
          return res.send({
            deleted: true,
          });
        });
      } else {
        res.send({
          deleted: false,
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

module.exports = deleteGroupController;
