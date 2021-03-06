'use strict';

angular.module('cookingBuddy20App')
  .factory('recipeService', ['$q', '$http', '$rootScope', '$location', function ($q, $http, $rootScope, $location) {

    var service = {};

    service.allRecipes = [];
    service.currRecipe = {};
    service.currentStep = -1;

    service.getAllRecipes = function () {
      return $http.get('/api/recipes')
        .success(function (recipes) {
           service.allRecipes = recipes;
           return recipes;
        });
    };

    service.getRecipe = function (recipeId) {
      return $http.get('/api/recipes/' + recipeId)
        .success(function (recipe) {
          //console.log(recipe);
          //console.log(recipe.creator);
          service.currRecipe = recipe;
        });
    };

    service.createRecipe = function (recipeObj) {
      return $http.post('/api/recipes', recipeObj)
        .success(function (data) {
          service.allRecipes.push(data);
        });
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
      return $http.put('/api/recipes/' + recipeObj._id, recipeObj)
        .success(function (data) {
          console.log('Success Creating Recipe');
        });
    };

    service.startFresh = function(){
      service.currentStep = -1;
    };

    service.getRecipeBasedOnUrl = function(){
      var recipeId = $location.path();
      return $http.get('/api/recipes/' + recipeId)
        .success(function (recipe) {
          //console.log(recipe);
          service.currRecipe = recipe;
        });
    };

    service.getAllUserRecipes = function(){
      return service.allRecipes.filter();
    };

    service.updateRecipe = function(recipe){
      service.currRecipe = recipe;
    };


    // service.saveState = function () {
    //   sessionStorage.recipeService = angular.toJson(service.state);
    //   console.log("33333333333hello from saveState");
    // };
    // //$rootScope.$on("savestate", saveState);

    // service.restoreState = function (){
    //   service.state = angular.fromJson(sessionStorage.recipeService);
    //   console.log("444444444hello from restoreState");
    // };

    // if (sessionStorage.recipeService) restoreState();
    // $rootScope.$on('savestate', service.saveState);
    // //$rootScope.$on('restorestate', service.restoreState);

    return service;
  }]);
