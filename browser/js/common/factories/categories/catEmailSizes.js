app.factory('catEmailSizes', function() {
	return function(emails) {
    return emails.map(function(email) {
      return (email.sizeEstimate)/1000;
    });
  };
});