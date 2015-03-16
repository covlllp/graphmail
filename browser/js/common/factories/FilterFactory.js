app.factory('FilterFactory', function(
	DataFactory,
	filterHangouts,
	filterAttachments,
	filterSendOrReceive,
	filterReplies,
  filterImportant
) {
	var factory = {};

	factory.filterFunctions = {
		// 'Hide Hangouts': filterHangouts(false),
		// 'Only Hangouts': filterHangouts(true),
		'No Attachments': filterAttachments(false),
		'Has Attachments': filterAttachments(true),
		'Sent Email': filterSendOrReceive(true),
		'Received Email': filterSendOrReceive(false),
		'Part of a Thread': filterReplies(true),
		'Single Email': filterReplies(false),
    'Important': filterImportant(true),
    'Unimportant': filterImportant(false)
	};

	factory.filterEmails = function(filterObj) {
		DataFactory.resetEmails();
		for (var key in filterObj) {
			if (filterObj[key]) {
				DataFactory.data.chartEmails
					= factory.filterFunctions[key](DataFactory.data.chartEmails);
			}
		}
	};

	return factory;
});