const twilio = require('twilio');

const sendSMS = (phoneNumber, otp) => {
    return new Promise(function (resolve, reject) {
        const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        client.messages.create({
            body: `OTP: ${otp}`,
            to: phoneNumber,
            from: process.env.TWILIO_NUMBER,
        }).then(() =>  resolve('OTP sent'))
        .catch(() => reject('Error sending OTP'));
    });
}

module.exports = sendSMS;
