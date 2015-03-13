
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

app.controller('HomeCtrl', function ($rootScope, $scope, AUTH_EVENTS, user, Email, ChartFactory, FilterFactory, TypeFactory){
  if (user) {
    $scope.showLoading = true;
    Email.query().$promise.then(function(emails) {
      FilterFactory.data.emails = emails;
      FilterFactory.resetEmails();
      TypeFactory.splitEmails();
      $scope.emails = FilterFactory.data.chartEmails;
      $scope.showLoading = false;
    });
  } else $scope.emails = [];

  $scope.data = ChartFactory.data;
  $scope.user = user;





  $scope.isShowingTime = false;
  $scope.timeOption = null;


  $scope.categoryOptions = Object.keys(ChartFactory.categoryFunctions);

  $scope.exampleData = [];

  $scope.exampleData = ChartFactory.getD3ChartObj();

  $scope.xAxisTickFormatFunction = function() {
    return ;
  };
  $scope.yAxisTickFormatFunction = function() {
    return ;
  };

  
  $scope.$watchCollection('data', function() {
      $scope.exampleData = ChartFactory.getD3ChartObj();
  });


  $rootScope.$on(AUTH_EVENTS.logoutSuccess, function() {
    $scope.user = null;
  });
});
