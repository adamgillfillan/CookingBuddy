'use strict';

angular.module('cookingBuddy20App')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.recipes = [];

    $http.get('/api/recipes').success(function(recipes) {
      $scope.recipes = recipes;
    });

    $scope.addRecipe = function() {
      if($scope.newRecipe === '') {
        return;
      }
      $http.post('/api/recipes', { name: $scope.newRecipe });
      $scope.newRecipe = '';
    };

    $scope.deleteRecipe = function(recipe) {
      $http.delete('/api/recipes/' + recipe._id);
    };

    $scope.viewRecipe = function(recipe) {
      $http.get('/api/recipes/' + recipe._id).success(function(recipe) {
        console.log('got the recipe');
        console.log(recipe);
      });
    };
  });