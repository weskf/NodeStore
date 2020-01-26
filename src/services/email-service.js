'use strict';

var config = require('../config');
// var sendgrid = require('sendgrid')(config.sendgridKey);

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.SENDGRID_API_KEY);

exports.send = async (to, subject, body) => {

    const msg = {
        to: to,
        from: 'wescley.kf@gmail.com',
        subject: subject,
        text: 'and easy to do anywhere, even with Node.js',
        html: body,
      };
      sgMail.send(msg);

    // sendgrid.send({
    //     to: to,
    //     from: 'wescley.kf@gmail.com',
    //     subject: subject,
    //     html: body
    // });
}



