app.factory('filterReplies', function(FilterFactory) {
  return function(bool) {
    // true if replies, false if single email
    return function(emails) {
      return emails.filter(function(email) {
        var thread = FilterFactory.hash.threads[email.threadId];
        var isMultiThread = thread.message !== 1;
        return bool ? isMultiThread : !isMultiThread; 
      });
    };
  };
});