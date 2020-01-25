'use strict';

var config = require('../config');
var sendGrid = require('sendgrid')(config.sendgridKey);

exports.send = async(to, subject, body) => {
    
    sendGrid.send({
        to: to,
        from: 'wescley.kf@gmail.com',
        subject: subject,
        body: body
    });    
}