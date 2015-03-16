app.factory('TypeFactory', function(
	FilterFactory,
  TimeFactory,
	typeHangouts,
	typeAttachments,
	typeSendOrReceive,
  typeImportant
	typeSearch
) {
	var factory = {};

	factory.data = {
		emailGroups: {} // keys are title, value is array of emails
	};

	factory.selectedType = {
		selected: 'No Type Separation',
		str: ''
	};

	function tempFunction() {}

	factory.typeFunctions = {
		'No Type Separation': {fn: function(emails) { return {'0': emails}; }, hasStr: false},
		'By Search String': {fn: typeSearch, hasStr: true},
		// 'By Hangouts': typeHangouts,
    'By Importance': {fn: typeImportant, hasStr: false},
		'By Attachment': {fn: typeAttachments, hasStr: false},
		'Sent or Recieved': {fn: typeSendOrReceive, hasStr: false}
	};

	factory.splitEmails = function() {
		factory.data.emailGroups =
			factory.typeFunctions[factory.selectedType.selected].fn(TimeFactory.data.chartEmails, factory.selectedType.str);
	};

	return factory;
});