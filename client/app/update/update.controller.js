'use strict';

angular.module('cookingBuddy20App')
  .controller('UpdateCtrl', function ($scope, recipeService, Auth) {
    $scope.message = 'Hello';
    $scope.recipeService = recipeService;
    $scope.currRecipe = recipeService.currRecipe;

    $scope.ingredients = [];
    $scope.steps = [];

    for(var i=0; i < $scope.currRecipe.ingredients.length; i++){
      $scope.ingredients.push({'id':'ingredient'+i})
    }
    for(i=0; i < $scope.currRecipe.steps.length; i++){
      $scope.steps.push({'id':'step'+i})
    }


    $scope.addNewIngredient = function () {
      var newItemNo = $scope.ingredients.length + 1;
      $scope.ingredients.push({'id':'ingredient'+newItemNo});
    };

    $scope.addNewStep = function () {
      var newItemNo = $scope.steps.length + 1;
      $scope.steps.push({'id':'step'+newItemNo});
    };

    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        $scope.currRecipe.creator = Auth.getCurrentUser();
        if($scope.currRecipe.image === ''){
          $scope.currRecipe.image = 'assets/images/yeoman.png';
        }
        recipeService.editRecipe($scope.currRecipe)
          .catch( function(err) {
            console.log('invalid');
            err = err.data;
            $scope.errors = {};

            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
            });
          });
        //$scope.newRecipe = { name: '', image: '', time: {prep: '', cook: '', cool: '', ready: ''}, ingredients: [], steps: [], creator: '' };
        //$scope.ingredients = [{id: 'ingredient0'}];
        //$scope.steps = [{id: 'step0'}];
        //$scope.submitted = false;
        //$scope.errors = '';
      }
    };
  });
