app.factory('ChartFactory', function() {
	var factory = {};

	var ChartObj = function(x, y, z) {
		this.x = x;
		this.y = y;
		this.size = 10;
	};

	factory.chart = {
		xAxis: [],
		yAxis: [],
		size: []
	};

	var getEmailSizes = function(emails) {
		return emails.map(function(email) {
			return email.sizeEstimate;
		});
	};

	var getEmailDates = function(emails) {
		return emails.map(function(email) {
			if (email.payload.headers[1] && email.payload.headers[1].name === 'Received') {
				var val = email.payload.headers[1].value;
				return Date.parse(val.split(';')[1].trim()); // ex. Tue, 3 Mar 2015 18:09:26 -0800 (PST)
			}
		});
	};

	factory.categoryFunctions = {
		'Email Size': getEmailSizes,
		'Email Dates': getEmailDates
	};

	factory.getD3ChartObj = function() {
		var arr = [];
		for (var i = 0; i < factory.chart.xAxis.length; i++) {
			arr.push(new ChartObj(factory.chart.xAxis[i],
								  factory.chart.yAxis[i],
								  factory.chart.size[i]));
		}
		return arr;
	};

	return factory;
});