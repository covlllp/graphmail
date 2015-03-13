'use strict';
var router = require('express').Router();
var async = require('async');
var Promise = require('bluebird');

var Google = require('googleapis');
var Gmail = Google.gmail('v1');
var oauth2Client = require('./../../../env/googleOauthClient');

var mongoose = require('mongoose');
var Email = mongoose.model('Email');
var Thread = mongoose.model('Thread');
var Label = mongoose.model('Label');

module.exports = router;



router.get('/', function(req, res, next) {
	var getEmailsFromGoogle = function(emailLimit) {
		var userEmail = req.user.email;
		var emailIds = [];
		var emails = [];

		var getEmails = function(oauth2Client, pageToken, callback) {
			console.log('...fetching emails');
			Gmail.users.messages.list({
				userId: userEmail,
				pageToken: pageToken,
				auth: oauth2Client
			}, function(err, response) {
				emailIds = emailIds.concat(response.messages.map(function(message) {
					return message.id;
				}));
				emailLimit -= response.messages.length;
				if (emailLimit > 0) {
					getEmails(oauth2Client, response.nextPageToken, callback);
				} else (callback());
			});
		};

		return new Promise(function(resolve, reject) {
			(new Promise(function(resolve, reject) {
				getEmails(oauth2Client, null, resolve);
			})).then(function() {
				console.log('populating email IDs');
				async.each(emailIds, function(emailId, done) {
					Gmail.users.messages.get({
						userId: userEmail,
						id: emailId,
						auth: oauth2Client
					}, function(err, message) {
						if (err) console.log(err);
						emails.push(message);
						done();
					});
				}, function() {
					console.log('Population done');
					resolve(emails);
				});
			});
		});
	};

	if (process.env.NODE_ENV === 'production') {
		var emailLimit = 1000;
		getEmailsFromGoogle(emailLimit)
		.then(function(emails) {
			res.json(emails);
		});
		
	} else {
		var emails, threads, labels;
		Email.find().exec().then(function(modelEmails) {
			emails = modelEmails.map(function(emailObj) {
				return emailObj.email;
			});
			console.log('Emails fetched');
			return Thread.find().exec();
		}).then(function(modelThreads) {
			threads = modelThreads;
			console.log('Threads fetched');
			return Label.find().exec();
		}).then(function(modelLabels) {
			labels = modelLabels.map(function(labelObj) {
				return labelObj.label;
			});
			console.log('Labels fetched');
			var rtnObj = {
				emails: emails,
				threads: threads,
				labels: labels
			};
			res.json(rtnObj);
		});
	}
});

router.get('/callback', function(req, res, next) {
	
	oauth2Client.getToken(req.query.code, function(err, tokens) {
		if (err) return next(err);
		oauth2Client.setCredentials(tokens);
		res.redirect('/');
	});
});