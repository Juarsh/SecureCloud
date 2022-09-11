const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
  token: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  expiryDate: Date,
});



module.exports = refreshTokenSchema;