const { groupModel } = require("../models");

const setGroupController = (req, res) => {
  const { name, desc, adminEmail, memberEmails } = req.body.group;
  const group = new groupModel({ name, desc, adminEmail, memberEmails });
  group.save((error, obj) => {
    if (error) {
      return res.send({
        message: error,
        result: false,
      });
    }
    return res.send({
      message: "Group Created",
      result: true,
      obj,
    });
  });
};

module.exports = setGroupController;
