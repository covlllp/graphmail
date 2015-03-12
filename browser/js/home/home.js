'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
          user: function(AuthService) {
            return AuthService.getLoggedInUser();
          }
        }
    });
});

app.controller('HomeCtrl', function ($rootScope, $scope, AUTH_EVENTS, user, Email, ChartFactory, FilterFactory){
  if (user) {
    $scope.showLoading = true;
    Email.query().$promise.then(function(emails) {
      FilterFactory.data.emails = emails;
      FilterFactory.resetEmails();
      $scope.emails = FilterFactory.data.chartEmails;
      $scope.showLoading = false;
    });
  } else $scope.emails = [];

  $scope.chart = ChartFactory.chart;
  $scope.categoryOptions = Object.keys(ChartFactory.categoryFunctions);
    
  $scope.user = user;

  $rootScope.$on(AUTH_EVENTS.logoutSuccess, function() {
    $scope.user = null;
  });
});
