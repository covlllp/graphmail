app.factory('catDates', function(EmailFactory) {
  return {
    Day: function(emails) {
      return emails.map(function(email) {
        var date = EmailFactory.getDate(email);
        return (date % (24 * 60 * 1000)) / (1000 * 60);
      });
    },

    Week: function(emails) {
      return emails.map(function(email) {
        var date = EmailFactory.getDate(email);
        return Date(date).getDay();
      });
    },

    Month: function(emails) {
      return emails.map(function(email) {
        var date = EmailFactory.getDate(email);
        return Date(date).getDate();
      });
    },

    Year: function(emails) {
      return emails.map(function(email) {
        var date = EmailFactory.getDate(email);
        return Date(date).getMonth() + 1;
      });
    }
  };
});