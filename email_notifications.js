'use strict';
const nodemailer = require('nodemailer');
module.exports = sendSomeMail
function sendSomeMail(recipients) {
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: '',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "javathunderman@nomik.xyz", // generated ethereal user
            pass: ""  // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"javathunderman" <javathunderman@nomik.xyz>', // sender address
        to: recipients, // list of receivers
        subject: 'Hello', // Subject line
        text: 'Flags'
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});
}
