app.factory('typePersonal', function(filterPersonal) {
  return function(emails) {
    var house = {};
    house['Personal Emails'] = filterPersonal(true)(emails);
    house['Group Emails'] = filterPersonal(false)(emails);
    return house;
  };
});