'use strict';
var router = require('express').Router();

var Google = require('googleapis');
var Gmail = Google.gmail('v1');

var mongoose = require('mongoose');
var Email = mongoose.model('Email');

module.exports = router;


router.get('/', function(res, req, send) {
	// if pulling from database
	Email.find().exec().then(function(emails) {
		emails = emails.map(function(emailObj) {
			return emailObj.email;
		});
		res.json(emails);
	});


	// if pulling from gmail
	gmail
});