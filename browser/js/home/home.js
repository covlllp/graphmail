'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
          user: function(AuthService) {
            return AuthService.getLoggedInUser();
          },
          emails: function($q, Email, user) {
            return user ? Email.query().$promise : $q.when([]);
          }
        }
    });
});

app.controller('HomeCtrl', function ($rootScope, $scope, AUTH_EVENTS, user, emails){
  $scope.emails = [];

  emails.forEach(function(email) {
    var headers = email.payload.headers;
    if (headers[1] && headers[1].name === 'Received') {
      var val = headers[1].value;
      var date = val.split(';')[1].trim(); // ex. Tue, 3 Mar 2015 18:09:26 -0800 (PST)
      date = Date.parse(date);
      $scope.emails.push({ x:date, y:email.sizeEstimate});
    }
  })

    
  $scope.user = user;

  $rootScope.$on(AUTH_EVENTS.logoutSuccess, function() {
    $scope.user = null;
  });
});
