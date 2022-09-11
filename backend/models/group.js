const mongoose = require("mongoose");
const groupSchema = require('../Schema/groups')

const groupModel = mongoose.model('group', groupSchema);
module.exports = groupModel;