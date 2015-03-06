'use strict';
// <!-- var RecipeSchema = new Schema({
//     name        : String,
//     image       : String,
//     time        : {
//         prep    : Number,
//         cook    : Number,
//         cool    : Number,
//         ready   : Number
//     },
//     ingredients : [String],
//     steps       : [String]
// }); -->

angular.module('cookingBuddy20App')
  .controller('MainCtrl', function ($scope, recipeService, $location) {

    $scope.recipeService = recipeService;
    recipeService.getAllRecipes();

    $scope.viewRecipe = function (recipe) {
      // recipeService.getRecipe(recipe._id);
      $location.path(recipe._id);
    };

    $scope.deleteRecipe = function (recipe) {
      recipeService.deleteRecipe(recipe._id);
    };

    $scope.updateRecipe = function (recipe){
      //$location.path('/test123');
      recipeService.updateRecipe(recipe)
    }

  });
