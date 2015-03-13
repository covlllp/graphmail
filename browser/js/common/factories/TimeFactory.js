app.factory('TimeFactory', function(FilterFactory, filterTime){
  var factory = {};

  var data = {
    min: null,
    max: null,
  }

  factory.storeConstraints = function(min, max) {
    data.min = min;
    data.max = max;
  }

  factory.getConstraints = function() {
    return data;
  }




  factory.filterEmails = function() {
    console.log(filterTime(data.min, data.max)(FilterFactory.data.chartEmails).length)
    FilterFactory.data.chartEmails = filterTime(data.min, data.max)(FilterFactory.data.chartEmails);
  }


  return factory;
})