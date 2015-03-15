app.factory('catThreadLength', function(DataFactory) {
	return function(emails) {
		return emails.map(function(email) {
      return DataFactory.hash.threads[email.threadId].messages.length;
    });
	};
});