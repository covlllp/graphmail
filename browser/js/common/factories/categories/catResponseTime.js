app.factory('catResponseTime', function(FilterFactory, EmailFactory) {
  return function(emails) {
    return emails.map(function(email) {
      var thread = FilterFactory.hash.threads[email.threadId];
      var emailInd = thread.messages.indexOf(email.id);
      if (emailInd < 0) return;
      var prevEmail = FilterFactory.hash.emails[thread[emailInd - 1]];
      return EmailFactory.getDate(email) - EmailFactory.getDate(prevEmail);
    });
  };
});