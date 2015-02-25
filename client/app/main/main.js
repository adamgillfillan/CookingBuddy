'use strict';

angular.module('cookingBuddy20App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        //url: '/',
        controller: 'MainCtrl',
        templateUrl: 'app/main/main.html',
        abstract: true
      })
      .state('main.index', {
        url: '/',
        controller: 'MainCtrl',
        views: {
            'recipe-content' : { templateUrl: 'app/main/templates/main.index.html' }
        }
      })
      .state('main.view', {
        url: '/:name',
        controller: 'DictionCtrl',
        views: {
            'recipe-content' : { templateUrl: 'app/main/templates/main.view.html' }
        },
        onEnter: function(recipeService){
          recipeService.startFresh();
        },
        onExit: function(dictionService){
          dictionService.stopListening();
        }
      })
      .state('main.about', {
        url: '/about',
        // controller: 'MainCtrl',
        views: {
            'recipe-content' : { templateUrl: 'app/main/templates/main.about.html' }
        }
      });
    });