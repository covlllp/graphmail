app.factory('filterReplies', function(DataFactory) {
  return function(bool) {
    // true if replies, false if single email
    return function(emails) {
      return emails.filter(function(email) {
        var thread = DataFactory.hash.threads[email.threadId];
        var isMultiThread = thread.messages.length !== 1;
        return bool ? isMultiThread : !isMultiThread; 
      });
    };
  };
});