app.factory('filterAttachments', function() {
	return function(bool) {
		// true with attachments, false without
		return function(emails) {
			return emails.filter(function(email) {
				var hasAttachment = email.payload.parts
									&& email.payload.parts.some(function(part) {
										return part.body.hasOwnProperty('attachmentId');
									});
				return bool ? hasAttachment : !hasAttachment;
			});
		};
	};
});