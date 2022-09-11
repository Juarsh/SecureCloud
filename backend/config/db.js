const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.MongoDB, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
        console.log("MongoDB connected")
    }).catch((err) => {
        console.log("error:", err);
    });
}

module.exports = connectDB;