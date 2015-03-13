app.factory('TypeFactory', function(
	FilterFactory,
	typeHangouts,
	typeAttachments
) {
	var factory = {};

	factory.data = {
		emailGroups: {} // keys are title, value is array of emails
	};

	factory.selectedType = {
		selected: 'No Type Separation'
	};

	function tempFunction() {}

	factory.typeFunctions = {
		'No Type Separation': function(emails) { return {'0': emails}; },
		'By Hangouts': typeHangouts,
		'By Attachment': typeAttachments
	};

	factory.splitEmails = function() {
		factory.data.emailGroups =
			factory.typeFunctions[factory.selectedType.selected](FilterFactory.data.chartEmails);
	};

	return factory;
});