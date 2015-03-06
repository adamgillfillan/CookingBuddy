'use strict';

angular.module('cookingBuddy20App')
  .config(function ($stateProvider) {
    $stateProvider
      // .state('main', {
      //   controller: 'MainCtrl',
      //   templateUrl: 'app/main/main.html',
      //   abstract: true
      // })
      .state('index', {
        url: '/',
        controller: 'MainCtrl',
        templateUrl: 'app/main/templates/index.html'
      })
      .state('about', {
        url: '/about',
        controller: 'MainCtrl',
        templateUrl: 'app/main/templates/about.html'
      })
      .state('my-recipes', {
        url: '/my-recipes',
        controller: 'MainCtrl',
        templateUrl: 'app/main/templates/user-recipes.html',
        authenticate: true
      })
      .state('view', {
        url: '/:name',
        controller: 'MainCtrl',
        templateUrl: 'app/main/templates/view.html',
        onEnter: function(recipeService, dictionService){
          recipeService.getRecipeBasedOnUrl();
          recipeService.startFresh();
          dictionService.continue = true;
        },
        onExit: function(dictionService){
          dictionService.stopListening();
        }
      });
    });
