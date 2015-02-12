'use strict';

angular.module('cookingBuddy20App')
  .factory('recipeService', function ($q, $http) {

    var service = {};

    service.allRecipes = [];
    service.currRecipe = {};

    service.getAllRecipes = function () {
      return $http.get('/api/recipes')
        .success(function (recipes) {
          service.allRecipes = recipes;
          return recipes;
        })
    };

    service.getRecipe = function (recipeId) {
      return $http.get('/api/recipes/' + recipeId)
        .success(function (recipe) {
          console.log(recipe);
          service.currRecipe = recipe;
        })
    };

    service.createRecipe = function (recipeObj) {
      return $http.post('/api/recipes', recipeObj)
        .success(function (data) {
          service.allRecipes.push(data);
        })
    };

    service.deleteRecipe = function (recipeId) {
      return $http.delete('/api/recipes/' + recipeId)
        .success(function (data) {
          for (var i = 0, len = service.allRecipes.length; i < len; i++) {
            if (service.allRecipes[i]._id === recipeId) {
              service.allRecipes.splice(i, 1);
            }
          }
          console.log('Success Deleting Recipe');
        });
    };

    service.editRecipe = function (recipeObj) {
      return $http.put('/api/recipes', recipeObj)
        .success(function (data) {
          console.log('Success Creating Recipe');
        })
    };

    return service;
  });