app.factory('typeLabels', function(DataFactory) {

  return function(emails) {
    var house = {};

    var addToLabel = function(email, label) {
      if (house.hasOwnProperty(label)) house[label].push(email);
      else house[label] = [email];
    };

    emails.forEach(function(email) {
      if (!email.labelIds) addToLabel(email, 'No Label');
      else {
        var hasBeenAdded = false;
        email.labelIds.forEach(function(label) {
          if (label.indexOf('Label') === 0) {
            addToLabel(email, DataFactory.hash.labels[label].name);
            hasBeenAdded = true;
          }
        });
        if (!hasBeenAdded) addToLabel(email, 'No Label');
      }
    });
    return house;
  };
});