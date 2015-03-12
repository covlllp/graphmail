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
  $scope.emails = { sizes: [], dates: []};

  emails.forEach(function(email) {
    if (email.payload.headers[1] && email.payload.headers[1].name === 'Received') {
      var val = email.payload.headers[1].value;
      var date = val.split(';')[1].trim(); // ex. Tue, 3 Mar 2015 18:09:26 -0800 (PST)
      date = Date.parse(date);
      $scope.emails.sizes.push(email.sizeEstimate);
      $scope.emails.dates.push(date);
    }
  })

    
  $scope.user = user;

  console.log(user)
  $rootScope.$on(AUTH_EVENTS.logoutSuccess, function() {
    $scope.user = null;
  })
});