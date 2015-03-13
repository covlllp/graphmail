'use strict';
app.factory('Email', function ($resource){
  return $resource('/api/email/', {}, {});
});