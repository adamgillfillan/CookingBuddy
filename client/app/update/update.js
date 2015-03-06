'use strict';

angular.module('cookingBuddy20App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('update', {
        url: '/update',
        templateUrl: 'app/update/update.html',
        controller: 'UpdateCtrl'
      });
  });