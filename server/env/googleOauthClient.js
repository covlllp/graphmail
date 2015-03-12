var Google = require('googleapis');
var googleConfig = require('./index.js').GOOGLE;
var OAuth2 = Google.auth.OAuth2;
var oauth2Client = new OAuth2(googleConfig.gmailClientID,
                              googleConfig.gmailClientSecret,
                              googleConfig.gmailCallbackURL);

module.exports = oauth2Client;