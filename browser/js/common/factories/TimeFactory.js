app.factory('TimeFactory', function(FilterFactory, filterTime){
  var factory = {};

  factory.data = {
    min: null,
    max: null,
    chartEmails: null
  }

  factory.storeConstraints = function(min, max) {
    factory.data.min = min;
    factory.data.max = max;
  }

  factory.getConstraints = function() {
    return factory.data;
  }

  factory.storeEmails = function(emails) {
    factory.data.emails = emails;
  }



  factory.filterEmails = function() {
    var c = getConstraints();
    factory.data.chartEmails = filterTime(c.min, c.max)(FilterFactory.data.chartEmails);
  }


  return factory;
})