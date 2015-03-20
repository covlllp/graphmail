
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

app.controller('HomeCtrl', function (
  $rootScope,
  $window,
  $scope,
  AUTH_EVENTS,
  user,
  Email,
  ChartFactory,
  FilterFactory,
  TypeFactory,
  TimeFactory,
  DataFactory
){
  if (user) {
    $scope.showLoading = true;
    Email.get().$promise.then(function(data) {
      DataFactory.data.emails = data.emails;
      DataFactory.data.threads = data.threads;
      DataFactory.data.labels = data.labels;
      DataFactory.populateHashes();

      DataFactory.resetEmails();
      TimeFactory.resetMinMax();
      TimeFactory.filterEmails();
      TypeFactory.splitEmails();
      $scope.emails = DataFactory.data.chartEmails;
      //$scope.labels = data.labels;
      $scope.showLoading = false;
    });
  } else $scope.emails = [];

  $scope.data = ChartFactory.data;
  $scope.user = user;

  $scope.isShowingTime = false;
  $scope.timeOption = null;


  $scope.logInWith = function(provider){
    $window.location.href = '/auth/' + provider;
  };

  // var colorArray = [
  //   '#3498db',
  //   '#f39c12',
  //   '#18bc9c',
  //   '#e74c3c',
  //   '#2c3e50'];
  // $scope.colorFunction = function() {
  //     return function(d, i) {
  //         return colorArray[i];
  //     };
  // };

  $scope.categoryOptions = Object.keys(ChartFactory.categoryFunctions);

  $scope.exampleData = [];

  $scope.exampleData = ChartFactory.getD3ChartObj();

  
  $scope.$watchCollection('data', function() {
      $scope.exampleData = ChartFactory.getD3ChartObj();
  });


  $rootScope.$on(AUTH_EVENTS.logoutSuccess, function() {
    $scope.user = null;
  });
});
