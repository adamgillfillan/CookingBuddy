'use strict';

angular.module('cookingBuddy20App')
  .controller('MainCtrl', function ($scope, recipeService, $location, $state) {

    $scope.recipeService = recipeService;
    recipeService.getAllRecipes();

    $scope.viewRecipe = function (recipe) {
      recipeService.getRecipe(recipe._id);
      $location.path('/' + recipe.name);
      //$state.go('main.view');
    };

    $scope.deleteRecipe = function () {
      recipeService.deleteRecipe(recipeService.currRecipe._id);
      $location.path('/');
    };

    $scope.newRecipe = { name: '', picture: '', description: '' };

    $scope.addRecipe = function () {
      recipeService.createRecipe($scope.newRecipe);
      $scope.newRecipe = { name: '', picture: '', description: '' };
    };

    // $scope.update = function(recipe){
    //     recipeService.currRecipe = recipe;
    // };
  });