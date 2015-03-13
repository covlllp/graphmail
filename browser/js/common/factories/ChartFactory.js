app.factory('ChartFactory', function(
  TypeFactory,
  catEmailSizes,
  catEmailDates,
  catThreadLength,
  catResponseTime
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
    'Email Size [kB]': catEmailSizes,
    'Email Dates': catEmailDates,
    'Thread Length': catThreadLength,
    'Response Times [minutes]': catResponseTime
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
        var chartObj = new ChartObj(obj.xAxis[i],
                    obj.yAxis[i],
                    obj.size[i]);

        if (!(chartObj.x <= 0 || chartObj.y <= 0 || chartObj.size <= 0))
          obj.values.push(chartObj);
      }
    });
    return factory.data.chart;
  };

  return factory;
});