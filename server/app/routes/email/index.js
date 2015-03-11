'use strict';
var router = require('express').Router();

var Google = require('googleapis');
var Gmail = Google.gmail('v1');

var mongoose = require('mongoose');
var Email = mongoose.model('Email');

module.exports = router;


var emailLimit = 10000;
var userId = 'colinvanlang@gmail.com';

router.get('/', function(res, req, send) {
	// if pulling from database
	Email.find().exec().then(function(emails) {
		emails = emails.map(function(emailObj) {
			return emailObj.email;
		});
		res.json(emails);
	});


	// if pulling from gmail
	var getEmails = function(pageToken) {
		Gmail.users.message.list({userId: userId}, function(err, res) {
			emailLimit -= res.resultSizeEstimate;
		});
	}
	Gmail.users.messages.list({userId: 'colinvanlang@gmail.com'}).then(function(emails) {
		emailLimit -= emails.size;
		if emailLimit > 0 //do again
	})
});