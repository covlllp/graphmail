app.factory('catThreadLength', function(HashFactory) {
	return function(emails) {
		return emails.map(function(email) {
      return HashFactory.hash.threads[email.threadId].messages.length;
    });
	};
});