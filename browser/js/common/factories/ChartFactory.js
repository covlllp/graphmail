app.factory('ChartFactory', function(
  FilterFactory,
  catEmailSizes,
  catEmailDates
) {
  var factory = {};

  var ChartObj = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.size = z || 10;
  };

  factory.chart = {
    xAxis: [],
    yAxis: [],
    size: []
  };

  factory.categoryOptions = {
    xAxis: '',
    yAxis: '',
    size: ''
  };

  factory.categoryFunctions = {
    'Email Size': catEmailSizes,
    'Email Dates': catEmailDates
  };

  factory.updateChart = function() {
    Object.keys(factory.chart).forEach(function(key) {
      var functionName = factory.categoryOptions[key];
      if (functionName)
        factory.chart[key]
        = factory.categoryFunctions[functionName](FilterFactory.data.chartEmails);
    });
  };

  factory.getD3ChartObj = function() {
    var arr = [];
    for (var i = 0; i < factory.chart.xAxis.length; i++) {
      arr.push(new ChartObj(factory.chart.xAxis[i],
                  factory.chart.yAxis[i],
                  factory.chart.size[i]));
    }
    return {values: arr, key: 'Hello'};
  };

  return factory;
});