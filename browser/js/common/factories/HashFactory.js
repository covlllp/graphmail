app.factory('HashFactory', function(FilterFactory) {
  var factory = {};

  factory.hash = {
    emails: {},
    threads: {},
    labels: {}
  };

  factory.populateHashes = function() {
    for (var key in factory.hash) {
      FilterFactory.data[key].forEach(function(obj) {
        factory.hash[key][obj.id] = obj;
      });
    }
  };

  return factory;
});