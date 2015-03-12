app.factory('FilterFactory', function() {
	var factory = {};

	factory.data = {
		emails: [],
		chartEmails: []
	}

	factory.filterFunctions = {

	};

	factory.resetEmails = function() {
		factory.data.chartEmails = factory.data.emails;
	};

	return factory;
});