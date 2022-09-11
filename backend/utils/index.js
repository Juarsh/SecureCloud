const sendMail = require('./sendMail')
const sendSMS = require('./sendSMS')
const tokenGenerate = require('./tokenGenerate')
const generateOTP = require('./generateOTP')
const verifyOTP = require('./verifyOTP');

module.exports = {
    sendMail,
    sendSMS,
    tokenGenerate,
    verifyOTP,
    generateOTP,
}