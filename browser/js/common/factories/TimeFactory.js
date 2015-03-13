app.factory('TimeFactory', function(FilterFactory, filterTime){
  var factory = {};
  var now = Date.now();

  factory.data = {
    min: now,
    max: now,
    chartEmails: []
  };

  factory.constraints = {
    allmin: factory.data.min,
    allmax: factory.data.max,
    min: factory.data.min,
    max: factory.data.max,    
  };

  factory.storeConstraints = function(min, max) {
    factory.data.min = min;
    factory.data.max = max;
  };

  factory.resetMinMax = function() {
    factory.data.min = now;
    factory.data.max = now;

    FilterFactory.data.chartEmails.forEach(function(email) {
      if (email.payload.headers[1] && email.payload.headers[1].name === 'Received') {
        var val = email.payload.headers[1].value;
        var date = Date.parse(val.split(';')[1].trim());
        if (date < factory.data.min) factory.data.min = date;
      }
    });
    factory.constraints.min = factory.data.min;
    factory.constraints.allmin = factory.data.min;
  };

  factory.filterEmails = function() {
    factory.data.chartEmails
      = filterTime(factory.data.min, factory.data.max)(FilterFactory.data.chartEmails);
  };

  return factory;
});