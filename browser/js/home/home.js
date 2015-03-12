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


app.controller('HomeCtrl', function ($rootScope, $scope, AUTH_EVENTS, user, emails, ChartFactory){
  $scope.emails = emails;
  $scope.chart = ChartFactory.chart;
  $scope.categoryOptions = Object.keys(ChartFactory.categoryFunctions);

    
  $scope.user = user;

  $rootScope.$on(AUTH_EVENTS.logoutSuccess, function() {
    $scope.user = null;
  });
});
