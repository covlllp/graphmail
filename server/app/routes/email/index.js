'use strict';
var router = require('express').Router();
var async = require('async');
var Promise = require('bluebird');

var Google = require('googleapis');
var Gmail = Google.gmail('v1');

var mongoose = require('mongoose');
var Email = mongoose.model('Email');

module.exports = router;


var emailLimit;
var emailIds = [];
var emails = [];
var userEmail = 'colinvanlang@gmail.com';
// Need to figure out userEmail and oauth2Client

// var getEmails = function(oauth2Client, pageToken, callback) {
// 	Gmail.users.messages.list({
// 		userId: userEmail,
// 		pageToken: pageToken,
// 		auth: oauth2Client
// 	}, function(err, res) {
// 		emailIds = emailIds.concat(res.messages.map(function(message) {
// 			return message.id;
// 		}));
// 		emailLimit -= res.resultSizeEstimate;
// 		if (emailLimit > 0) {
// 			getEmails(oauth2Client, res.nextPageToken, callback);
// 		} else (callback());
// 	});
// };

// var promise = new Promise(function(resolve, reject) {
// 	getEmails(oauth2Client, null, resolve);
// });

router.get('/', function(req, res, send) {
	emailLimit = 10000;
	emailIds = [];
	emails = [];
	// if (process.env.NODE_ENV === 'production') {
	// 	promise.then(function() {
	// 		async.each(emailIds, function(emailId, done) {
	// 			Gmail.users.messages.get({
	// 				userId: userEmail,
	// 				id: emailId,
	// 				auth: oauth2Client
	// 			}, function(err, message) {
	// 				emails.push(message);
	// 				done();
	// 			});
	// 		}, function() {
	// 			res.json(emails);
	// 		});
	// 	});
	// } else {
		Email.find().exec().then(function(emails) {
			emails = emails.map(function(emailObj) {
				return emailObj.email;
			});
			res.json(emails);
		});
	// }
});