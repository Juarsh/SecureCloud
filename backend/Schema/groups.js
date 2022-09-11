const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    desc: {
        type: String,
        trim: true
    },
    adminEmail: {
        type: String,
        trim: true,
    },
    memberEmails: {
        type: [String],
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedBy: {
        type: String,
    }
}, { timestamps: true });


module.exports = groupSchema;