var async = require('async');
var Promise = require('bluebird');
var apiInfo = require('./server/env/development');

var Google = require('googleapis');
var Gmail = Google.gmail('v1');
var readline = require('readline');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/graphmail');
require('./server/db/models/email');
var Email = mongoose.model('Email');

var emailLimit = 1000;
var userEmail = process.argv[2];
var emailIds = [];


// Authenticating through Google
var OAuth2 = Google.auth.OAuth2;
var oauth2Client
	= new OAuth2(apiInfo.GOOGLE.clientID,
		apiInfo.GOOGLE.clientSecret,
		apiInfo.GOOGLE.callbackURL);

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

function getAccessToken(oauth2Client, callback) { // Code from Google
  // generate consent page url
  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/gmail.readonly'
  });

  console.log('Visit the url: ', url);
  rl.question('Enter the code here: ', function(code) {
    // request access token
    oauth2Client.getToken(code, function(err, tokens) {
      // set tokens to the client
      // TODO: tokens should be set by OAuth2 client.
      oauth2Client.setCredentials(tokens);
      callback();
    });
  });
}

var getEmails = function(oauth2Client, pageToken, callback) {
	console.log('...fetching next 100 emails');
	Gmail.users.messages.list({
		userId: userEmail,
		pageToken: pageToken,
		auth: oauth2Client
	}, function(err, res) {
		emailIds = emailIds.concat(res.messages.map(function(message) {
			return message.id;
		}));
		emailLimit -= res.messages.length;
		if (emailLimit > 0) {
			getEmails(oauth2Client, res.nextPageToken, callback);
		} else (callback());
	});
};

mongoose.connection.on('open', function() {
	console.log('Clearing database');
	mongoose.connection.db.dropDatabase(function() {
		console.log('Signing into Google');
		getAccessToken(oauth2Client, function() {
			console.log('Getting email IDs');
			var promise = new Promise(function(resolve, reject) {
				getEmails(oauth2Client, null, resolve);
			});
			promise.then(function() {
				console.log('Number of emails: ', emailIds.length);
				console.log('Populating emails and saving to database');
				async.each(emailIds, function(emailId, done) {
					Gmail.users.messages.get({
						userId: userEmail,
						id: emailId,
						auth: oauth2Client
					}, function(err, message) {
						Email.create({email: message}, done);
					});
				}, function() {
					console.log('Population done, press CTRL+C to exit');
				});
			});
		});
	});
});