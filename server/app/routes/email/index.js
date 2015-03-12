'use strict';
var router = require('express').Router();
var async = require('async');
var Promise = require('bluebird');

var Google = require('googleapis');
var Gmail = Google.gmail('v1');
var GoogleConfig = require('./../../../env').GOOGLE;
var OAuth2 = Google.auth.OAuth2;
var oauth2Client = {};

var mongoose = require('mongoose');
var Email = mongoose.model('Email');

module.exports = router;

router.get('/', function(req, res, next) {
	var emailLimit = 10000;

	// if (process.env.NODE_ENV === 'production') {
		
	// } else {
		Email.find().exec().then(function(emails) {
			emails = emails.map(function(emailObj) {
				return emailObj.email;
			});
			res.json(emails);
		});
	// }
});

router.get('/callback', function(req, res, next) {
	console.log('a')
	var oauth2Client = req.session.oauth2Client;
	console.log('b')
	console.log(oauth2Client);
	oauth2Client.getToken(req.query.code, function(err, tokens) {
		console.log('c')
		if (err) return next(err);
		oauth2Client.setCredentials(tokens);
		res.redirect('/');
	});
});