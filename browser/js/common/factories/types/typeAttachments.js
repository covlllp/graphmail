app.factory('typeAttachments', function(filterAttachments) {
	return function(emails) {
		var house = {};
    house.Attachment = filterAttachments(true)(emails);
    house['Not Attachment'] = filterAttachments(false)(emails);
    return house;
	};
});