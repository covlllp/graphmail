app.factory('catResponseTime', function(HashFactory, EmailFactory) {
  return function(emails) {
    return emails.map(function(email) {
      var thread = HashFactory.hash.threads[email.threadId];
      var emailInd = thread.messages.indexOf(email.id);
      if (emailInd < 1) return -1;
      var prevEmail = HashFactory.hash.emails[thread.messages[emailInd - 1]];
      return (EmailFactory.getDate(email) - EmailFactory.getDate(prevEmail))/60000;
    });
  };
});