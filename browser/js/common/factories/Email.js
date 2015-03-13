'use strict';
app.factory('Email', function ($resource){
  return $resource('/api/email/', {action1: {method: 'GET', isArray: false}}, {});
});