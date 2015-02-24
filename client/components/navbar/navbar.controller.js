'use strict';

angular.module('cookingBuddy20App')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': 'main.index'
    },
    {
      'title': 'About',
      'link': 'main.about'  
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });