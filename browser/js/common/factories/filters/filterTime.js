app.factory('filterTime', function() {
  return function(min, max) {
    console.log(min, max)
    return function(emails) {
      return emails.filter(function(email) {
        //if (email.payload.headers[1] && email.payload.headers[1].name === 'Received') {
          var val = email.payload.headers[1].value;
          var date = Date.parse(val.split(';')[1].trim());
          return date > min && date < max;
        //}
        //return true;    
      });
    };
  };
});