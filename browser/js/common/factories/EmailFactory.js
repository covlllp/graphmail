app.factory('EmailFactory', function() {
  var factory = {};

  factory.getDate = function(email) {
    if (email.payload.headers[1] && email.payload.headers[1].name === 'Received') {
      var val = email.payload.headers[1].value;
      return Date.parse(val.split(';')[1].trim());
    }
  };

  factory.getSender = function(email) {
    var rtn;
    email.payload.headers.forEach(function(header) {
      if (header.name === 'From') {
        if (header.value.indexOf('<') === -1) rtn = header.value;
        else rtn = header.value.match(/<(.+)>/)[1];
        return;
      }
    });
    return rtn;
  };

  factory.getRecipient = function(email) {
    var rtn;
    email.payload.headers.forEach(function(header) {
      if (header.name === 'To') {
        if (header.value.indexOf('<') === -1) rtn = header.value;
        else rtn = header.value.match(/<(.+)>/)[1];
        return;
      }
    });
    return rtn;
  };

  return factory;
});