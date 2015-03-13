app.factory('catEmailDates', function() {
  return function(emails) {
    return emails.map(function(email) {
      if (email.payload.headers[1] && email.payload.headers[1].name === 'Received') {
        var val = email.payload.headers[1].value;
        return Date.parse(val.split(';')[1].trim());
        // ex. Tue, 3 Mar 2015 18:09:26 -0800 (PST)
      }
    });
  };
});