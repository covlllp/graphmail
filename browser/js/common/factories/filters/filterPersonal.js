app.factory('filterPersonal', function() {
  return function(bool) {
    // true if personal (no cc, only one to), false otherwise
    return function(emails) {
      return emails.filter(function(email) {
        email.payload.headers.forEach(function(header) {
          if (header.name === 'Cc') {
            return false;
          } else return true;
        });
      });
    };
  };
});