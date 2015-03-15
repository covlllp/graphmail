app.factory('LogFactory', function() {
  var factory = {};

  factory.logStates = {
    xAxis: false,
    yAxis: false
  };

  factory.logify = function(arr, axis) {
    if (!factory.logStates[axis]) return arr;
    return arr.map(function(val) {
      if (val <= 0) return val;
      else {
        return Math.log(val) / Math.log(10);
      }
    });
  };

  return factory;
});