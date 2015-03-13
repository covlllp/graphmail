app.factory('filterHangouts', function() {
	return function(bool) {
		return function(emails) {
			emails = emails.filter(function(email) {
				var isHangout = email.payload.headers[1];
				return bool ? !isHangout : isHangout;
			});
		};
	};
});