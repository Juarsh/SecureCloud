const mongoose = require('mongoose');
const userSchema = require('../Schema/user')
const generateOTP = require('../utils/generateOTP');

userSchema.methods.createUser = function () {
    return new Promise((resolve, reject) => {
        this.userOTP = generateOTP(4);
        this.save((error, res) => {
            if (error) {
                console.error(error);
                return reject(error);
            } console.log(res)
            resolve(res);
        })
    })
}

const userModel = mongoose.model('user', userSchema);
module.exports = userModel
