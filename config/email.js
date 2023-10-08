require('dotenv').config();
const nodemailer = require('nodemailer');
const user = process.env.EMAIL_USER;
const password = process.env.EMAIL_PASSWORD;

// object that is able to send mail
const transporter = nodemailer.createTransport({
    service: "Gmail",
    //port: 465, 
    auth: {
        user: user,
        pass: password
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = transporter;