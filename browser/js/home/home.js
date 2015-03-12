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
          emails: function(Email, user) {
            return user ? Email.query().$promise : $q.when([]);
          }
        }
    });
});

app.controller('HomeCtrl', function ($scope, emails){
  $scope.emails = emails;
});