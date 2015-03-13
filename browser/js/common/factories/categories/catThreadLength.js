app.factory('catThreadLength', function(FilterFactory) {
	return function(emails) {
		return emails.map(function(email) {
      return FilterFactory.hash.threads[email.threadId].messages.length;
    });
	};
});