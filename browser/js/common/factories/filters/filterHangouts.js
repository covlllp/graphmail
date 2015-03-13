app.factory('filterHangouts', function() {
	return function(bool) {
		return function(emails) {
			return emails.filter(function(email) {
				var isHangout = email.payload.headers[1];
				return bool ? !isHangout : isHangout;
			});
		};
	};
});