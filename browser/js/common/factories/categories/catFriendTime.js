app.factory('catFriendTime', function(EmailFactory, Session) {
  return function(emails) {
    var friendHash = {};

    var addToHash = function(name, time) {
      if (!friendHash.hasOwnProperty(name)) {
        friendHash[name] = {start: time, fin: time};
      } else {
        if (friendHash[name].start > time) friendHash[name].start = time;
        else if (friendHash[name].fin < time) friendHash[name].fin = time;
      }
    };

    var getPerson = function(email) {
      var sender = EmailFactory.getSender(email);
      var recipient = EmailFactory.getRecipient(email);
      return (sender === Session.user.email) ? recipient : sender;
    };

    emails.forEach(function(email) {
      var person = getPerson(email);
      var time = EmailFactory.getDate(email);
      addToHash(person, time);
    });

    console.log(friendHash);
    return emails.map(function(email) {
      var person = getPerson(email);
      var timeDiff = friendHash[person].fin - friendHash[person].start;
      return timeDiff ? timeDiff : -1;
    });
  }
});