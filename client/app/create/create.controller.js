'use strict';

angular.module('cookingBuddy20App')
  .controller('CreateCtrl', function ($scope, recipeService, Auth) {
    $scope.message = 'Hello';

    $scope.recipeService = recipeService;
    $scope.ingredients = [{id: 'ingredient0'}];
    $scope.steps = [{id: 'step0'}];

    $scope.addNewIngredient = function () {
      var newItemNo = $scope.ingredients.length + 1;
      $scope.ingredients.push({'id':'ingredient'+newItemNo});
    };

    $scope.addNewStep = function () {
      var newItemNo = $scope.ingredients.length + 1;
      $scope.steps.push({'id':'step'+newItemNo});
    };

    $scope.newRecipe = { name: '', image: '', time: {prep: '', cook: '', cool:   '', ready: ''}, ingredients: [], steps: [], creator: '' };

    //$scope.addRecipe = function () {
    //  $scope.newRecipe.creator = Auth.getCurrentUser();
    //  recipeService.createRecipe($scope.newRecipe);
    //
    //  $scope.newRecipe = { name: '', image: '', time: {prep: '', cook: '', cool: '', ready: ''}, ingredients: [], steps: [], creator: '' };
    //  $scope.ingredients = [{id: 'ingredient0'}];
    //  $scope.steps = [{id: 'step0'}];
    //};

    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        $scope.newRecipe.creator = Auth.getCurrentUser();
        recipeService.createRecipe($scope.newRecipe)
          .catch( function(err) {
            console.log("invalid");
            err = err.data;
            $scope.errors = {};

            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
            });
          });
        $scope.newRecipe = { name: '', image: '', time: {prep: '', cook: '', cool: '', ready: ''}, ingredients: [], steps: [], creator: '' };
        $scope.ingredients = [{id: 'ingredient0'}];
        $scope.steps = [{id: 'step0'}];
      }
    };

  });
