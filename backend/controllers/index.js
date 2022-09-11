const sendOTPController = require("./sendOTPController");
const registerController = require("./registerController");
const sendMailController = require("./sendMailController");
const verifyOTPController = require("./verifyOTPController");
const loginController = require("./loginController");
const refreshTokenController = require("./refreshTokenController");
const setGroupController = require("./setGroupController");
const deleteGroupController = require("./deleteGroupController.js");
const getGroupController = require("./getGroupController");
const getGroupByIdController = require("./getGroupByIdController");
const getAllGroupController = require("./getAllGroupsController");
const getAllUserController = require("./getAllUSerController");
const getIPController = require("./getIPController");

module.exports = {
  getAllGroupController,
  sendOTPController,
  registerController,
  sendMailController,
  verifyOTPController,
  loginController,
  refreshTokenController,
  setGroupController,
  getGroupController,
  deleteGroupController,
  getGroupByIdController,
  getAllUserController,
  getIPController,
};
