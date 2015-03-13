app.factory('EmailFactory', function() {
  var factory = {};

  factory.getDate = function(email) {
    if (email.payload.headers[1] && email.payload.headers[1].name === 'Received') {
      var val = email.payload.headers[1].value;
      return Date.parse(val.split(';')[1].trim());
    }
  };

  factory.getSender = function(email) {
    email.payload.headers.forEach(function(header) {
      if (header.name === 'From') {
        if (header.value.indexOf('<') === -1) return header.value;
        else return header.value.match(/<(.+)>/)[1];
      }
    });
  };

  return factory;
});