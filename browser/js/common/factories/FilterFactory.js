app.factory('FilterFactory', function(
	filterHangouts
) {
	var factory = {};

	factory.data = {
		emails: [],
		chartEmails: []
	};

	// var toggleHangouts = function(bool) {
	// 	// true if show, false if hide
	// 	return function() {
	// 		factory.data.chartEmails = factory.data.chartEmails.filter(function(email) {
	// 			var isHangout = email.payload.headers[1];
	// 			return bool ? !isHangout : isHangout;
	// 		});
	// 	};
	// };



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
				factory.filterFunctions[key](factory.data.chartEmails);
			}
		}
	};

	return factory;
});