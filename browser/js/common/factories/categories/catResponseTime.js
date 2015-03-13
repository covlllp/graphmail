app.factory('catResponseTime', function(FilterFactory, EmailFactory) {
  return function(emails) {
    return emails.map(function(email) {
      var thread = FilterFactory.hash.threads[email.threadId];
      var emailInd = thread.messages.indexOf(email.id);
      if (emailInd < 1) return -1;
      var prevEmail = FilterFactory.hash.emails[thread.messages[emailInd - 1]];
      return (EmailFactory.getDate(email) - EmailFactory.getDate(prevEmail))/60000;
    });
  };
});