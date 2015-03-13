app.factory('FilterFactory', function(
	filterHangouts
) {
	var factory = {};

	factory.data = {
		emails: [],
		chartEmails: []
	};

	factory.filterFunctions = {
		'Hide Hangouts': filterHangouts(false),
		'Only Hangouts': filterHangouts(true)
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

	return factory;
});