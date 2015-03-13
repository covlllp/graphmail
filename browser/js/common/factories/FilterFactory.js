app.factory('FilterFactory', function(
	filterHangouts,
	filterAttachments
) {
	var factory = {};

	factory.data = {
		emails: [],
		threads: [],
		labels: [],
		chartEmails: []
	};

	factory.hash = {
		emails: {},
		thread: {},
		labels: {}
	};

	factory.filterFunctions = {
		'Hide Hangouts': filterHangouts(false),
		'Only Hangouts': filterHangouts(true),
		'No Attachments': filterAttachments(false),
		'Has Attachments': filterAttachments(true)
	};

	factory.resetEmails = function() {
		factory.data.chartEmails = factory.data.emails;
	};

	factory.filterEmails = function(filterObj) {
		factory.resetEmails();
		for (var key in filterObj) {
			if (filterObj[key]) {
				factory.data.chartEmails
					= factory.filterFunctions[key](factory.data.chartEmails);
			}
		}
	};

	factory.populateHashes = function() {
		for (var key in factory.hash) {
			factory.data[key].forEach(function(obj) {
				factory.hash[key][obj.id] = obj;
			});
		}
	};

	return factory;
});