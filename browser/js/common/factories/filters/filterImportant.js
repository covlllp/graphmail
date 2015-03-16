app.factory('filterImportant', function() {
  return function(bool) {
    // true if replies, false if single email
    return function(emails) {
      return emails.filter(function(email) {
        var isImportant = email.labelIds.indexOf('IMPORTANT') !== -1;
        return bool ? isImportant : !isImportant; 
      });
    };
  };
});