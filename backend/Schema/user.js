const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
        index: { unique: true, sparse: true }
    },
    phoneNumber: {
        type: String,
        index: { unique: true, sparse: true }
    },
    verifiedByEmail: {
        type: Boolean,
        default: false
    },
    verifiedByPhone: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
    },

}, { timestamps: true });


module.exports = userSchema;