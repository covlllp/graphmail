app.factory('filterSendOrReceive', function(Session) {
  return function(bool) {
    // true for send, false for receive
    return function(emails) {
      return emails.filter(function(email) {
        var isSent = email.payload.headers.some(function(header) {
          return header.name === 'From'
            && header.value.indexOf('<') !== -1
            && header.value.match(/<(.+)>/)[1] === Session.user.email;
        });
        return bool ? isSent : !isSent;
      });
    };
  };
});