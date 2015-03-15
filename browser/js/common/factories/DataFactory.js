app.factory('DataFactory', function() {
  var factory = {};

  factory.data = {
    emails: [],
    threads: [],
    labels: [],
    chartEmails: []
  };


  factory.hash = {
    emails: {},
    threads: {},
    labels: {}
  };

  factory.resetEmails = function() {
    factory.data.chartEmails = factory.data.emails;
  };

  factory.populateHashes = function() {
    for (var key in factory.hash) {
      factory.data[key].forEach(function(obj) {
        factory.hash[key][obj.id] = obj;
      });
    }
  };

  return factory;
});