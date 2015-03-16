app.factory('FilterFactory', function(
	DataFactory,
	filterHangouts,
	filterAttachments,
	filterSendOrReceive,
	filterReplies,
	filterSearch
) {
	var factory = {};

	factory.filterFunctions = {
		// 'Hide Hangouts': filterHangouts(false),
		// 'Only Hangouts': filterHangouts(true),
		'No Attachments': {fn: filterAttachments(false), hasStr: false},
		'Has Attachments': {fn: filterAttachments(true), hasStr: false},
		'Sent Email': {fn: filterSendOrReceive(true), hasStr: false},
		'Received Email': {fn: filterSendOrReceive(false), hasStr: false},
		'Part of a Thread': {fn: filterReplies(true), hasStr: false},
		'Single Email': {fn: filterReplies(false), hasStr: false},
		'Filter by Email': {fn: filterSearch(true), hasStr: true},
	};

	factory.filterEmails = function(filterObj) {
		DataFactory.resetEmails();
		for (var key in filterObj) {
			if (filterObj[key].selected) {
				DataFactory.data.chartEmails
					= factory.filterFunctions[key].fn(DataFactory.data.chartEmails, filterObj[key].str);
			}
		}
	};

	return factory;
});