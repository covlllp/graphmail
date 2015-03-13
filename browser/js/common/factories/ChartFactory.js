app.factory('ChartFactory', function(
  TypeFactory,
  catEmailSizes,
  catEmailDates
) {
  var factory = {};

  var ChartObj = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.size = z || 10;
  };

  factory.data = {
    chart: [{ key: '0', values: [], xAxis: [], yAxis: [], size: [] }]
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
    factory.data.chart = Object.keys(TypeFactory.data.emailGroups).map(function(title) {
      return { key: title, values: [], xAxis: [], yAxis: [], size: [] };
    });

    Object.keys(factory.categoryOptions).forEach(function(axis) {
      var functionName = factory.categoryOptions[axis];
      if (functionName) {
        factory.data.chart.forEach(function(obj) {
          obj[axis] = factory.categoryFunctions[functionName](TypeFactory.data.emailGroups[obj.key]);
        });
      }
    });
  };

  factory.getD3ChartObj = function() {
    factory.data.chart.forEach(function(obj) {
      for (var i = 0; i < obj.xAxis.length; i++) {
        obj.values.push(new ChartObj(obj.xAxis[i],
                    obj.yAxis[i],
                    obj.size[i]));
      }
    });
    return factory.data.chart;
  };

  return factory;
});