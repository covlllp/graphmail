var async = require('async');
var Promise = require('bluebird');
var apiInfo = require('./server/env/development');

var Google = require('googleapis');
var Gmail = Google.gmail('v1');
var readline = require('readline');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/graphmail');
require('./server/db/models/email');
require('./server/db/models/thread');
require('./server/db/models/label');
var Email = mongoose.model('Email');
var Thread = mongoose.model('Thread');
var Label = mongoose.model('Label');

var goal = 1000;
var emailLimit = goal;
var userEmail = process.argv[2];


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

var getThreads = function(oauth2Client, pageToken, callback) {
	console.log('Fetching 100 Threads');
	Gmail.users.threads.list({
		userId: userEmail,
		pageToken: pageToken,
		auth: oauth2Client
	}, function(err, threadsObj) {
		console.log('Saving fetched threads and emails to database');
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
						Email.create({email: email});
						return email.id;
					});
					Thread.create({id: thread.id, messages: messages});
					emailLimit -= threadObj.messages.length;
					done();
				}
			});
		}, function() {
			console.log((goal - emailLimit), 'emails fetched.');
			if (emailLimit > 0) {
				getThreads(oauth2Client, threadsObj.nextPageToken, callback);
			} else callback();
		});
	});
};


mongoose.connection.on('open', function() {
	console.log('Clearing database');
	mongoose.connection.db.dropDatabase(function() {
		console.log('Signing into Google');
		getAccessToken(oauth2Client, function() {
			console.log('Getting Emails and Threads');
			(new Promise(function(resolve, reject) {
				getThreads(oauth2Client, null, resolve);
			})).then(function() {
				console.log('Fetching labels');
				Gmail.users.labels.list({
					userId: userEmail,
					auth: oauth2Client
				}, function(err, labelsObj) {
					console.log('Saving labels to database');
					async.each(labelsObj.labels, function(label, done) {
						Label.create({label: label}, done);
					}, function() {
						console.log('Population done, press CTRL+C to exit');
					});
				});
			});
		});
	});
});