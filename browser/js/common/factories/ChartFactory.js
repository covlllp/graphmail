app.factory('ChartFactory', function() {
	var factory = {};

	var ChartObj = function(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	};

	factory = {
		chart: {
			xAxis: [],
			yAxis: [],
			size: []
		}
	};

	factory.getD3ChartObj = function() {
		var arr = [];
		for (var i = 0; i < factory.chart.xAxis; i++) {
			arr.push(new ChartObj(factory.chart.xAxis[i],
								  factory.chart.yAxis[i],
								  factory.chart.size[i]));
		}
		return arr;
	};

	return factory;
});