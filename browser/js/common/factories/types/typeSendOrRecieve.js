app.factory('typeSendOrReceive', function(filterSendOrReceive) {
  return function(emails) {
    var house = {};
    house.Sent = filterSendOrReceive(true)(emails);
    house.Received = filterSendOrReceive(false)(emails);
    return house;
  };
});