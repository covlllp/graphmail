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
	var emails = [], threads = [], labels = [];

	var getEmailsFromGoogle = function(emailLimit) {
		var userEmail = req.user.email;

		var getThreads = function(oauth2Client, pageToken, callback) {
			console.log('...Fetching 100 Threads');
			Gmail.users.threads.list({
				userId: userEmail,
				pageToken: pageToken,
				auth: oauth2Client
			}, function(err, threadsObj) {
				console.log('Saving fetched emails and threads to database');
				async.each(threadsObj.threads, function(thread, done) {
					Gmail.users.threads.get({
						userId: userEmail,
						id: thread.id,
						pageToken: pageToken,
						auth: oauth2Client
					}, function(err, threadObj) {
						if (!threadObj.messages[0].payload.headers[1]) done();
						else {
							var messages = threadObj.messages.map(function(email) {
								emails.push(email);
								return email.id;
							});
							threads.push({id: thread.id, messages: messages});
							emailLimit -= threadObj.messages.length;
							done();
						}
					});
				}, function() {
					console.log('Finished populating 100 Threads');
					if (emailLimit > 0) {
						getThreads(oauth2Client, threadsObj.nextPageToken, callback);
					} else callback();
				});
			});
		};

		return new Promise(function(resolve, reject) {
			getThreads(oauth2Client, null, resolve);
		});
	};

	// if (process.env.NODE_ENV === 'production') {
		var emailLimit = 1000;
		emails = []; threads = []; labels = [];
		getEmailsFromGoogle(emailLimit)
		.then(function(data) {
			var userEmail = req.user.email;
			console.log('Fetching Labels');
			Gmail.users.labels.list({
				userId: userEmail,
				auth: oauth2Client
			}, function(err, labelsObj) {
				async.each(labelsObj.labels, function(label, done) {
					labels.push(label);
					done();
				}, function() {
					console.log('Labels fetched');
					var rtnObj = {
						emails: emails,
						threads: threads,
						labels: labels
					};
					res.json(rtnObj);
				});
			});
		});
		
	// } else {
	// 	Email.find().exec().then(function(modelEmails) {
	// 		emails = modelEmails.map(function(emailObj) {
	// 			return emailObj.email;
	// 		});
	// 		console.log('Emails fetched');
	// 		return Thread.find().exec();
	// 	}).then(function(modelThreads) {
	// 		threads = modelThreads;
	// 		console.log('Threads fetched');
	// 		return Label.find().exec();
	// 	}).then(function(modelLabels) {
	// 		labels = modelLabels.map(function(labelObj) {
	// 			return labelObj.label;
	// 		});
	// 		console.log('Labels fetched');
	// 		var rtnObj = {
	// 			emails: emails,
	// 			threads: threads,
	// 			labels: labels
	// 		};
	// 		res.json(rtnObj);
	// 	});
	// }
});

router.get('/callback', function(req, res, next) {
	
	oauth2Client.getToken(req.query.code, function(err, tokens) {
		if (err) return next(err);
		oauth2Client.setCredentials(tokens);
		res.redirect('/');
	});
});