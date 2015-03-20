module.exports = {
    "DATABASE_URI": process.env.MONGOLAB_URI,
    "SESSION_SECRET": process.env.SESSION_SECRET,
    "GOOGLE": {
        "clientID": process.env.GOOGLE_CLIENT_ID,
        "clientSecret": process.env.GOOGLE_CLIENT_SECRET,
        "callbackURL": process.env.CALLBACK_URL,
        "gmailClientID": process.env.GMAIL_GOOGLE_CLIENT_ID,
        "gmailClientSecret": process.env.GMAIL_GOOGLE_CLIENT_SECRET,
        "gmailCallbackURL": process.env.GMAIL_CALLBACK_URL
    }
};