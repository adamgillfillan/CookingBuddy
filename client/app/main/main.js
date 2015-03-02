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
      .state('create', {
        url: '/create',
        controller: 'MainCtrl',
        templateUrl: 'app/main/templates/create.html'
      })
      .state('view', {
        url: '/:name',
        controller: 'MainCtrl',
        templateUrl: 'app/main/templates/view.html',
        onEnter: function(recipeService){
          recipeService.getRecipeBasedOnUrl();
          recipeService.startFresh();
        },
        onExit: function(dictionService){
          dictionService.stopListening();
        }
      });
    });
