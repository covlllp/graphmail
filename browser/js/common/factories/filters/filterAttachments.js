app.factory('filterAttachments', function() {
	function searchForAttachment(part) {
		if (part.hasOwnProperty('parts')) {
			return part.parts.some(searchForAttachment);
		} else return part.body.hasOwnProperty('attachmentId');
	}

	return function(bool) {
		// true with attachments, false without
		return function(emails) {
			return emails.filter(function(email) {
				var hasAttachment = email.payload.parts
					&& email.payload.parts.some(searchForAttachment);
				return bool ? hasAttachment : !hasAttachment;
			});
		};
	};
});