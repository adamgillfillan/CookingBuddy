'use strict';


      // .state('login', {
      //   url: '/login',
      //   templateUrl: 'app/account/login/login.html',
      //   controller: 'LoginCtrl'
      // })
      // .state('signup', {
      //   url: '/signup',
      //   templateUrl: 'app/account/signup/signup.html',
      //   controller: 'SignupCtrl'
      // })
      // .state('settings', {
      //   url: '/settings',
      //   templateUrl: 'app/account/settings/settings.html',
      //   controller: 'SettingsCtrl',


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
          recipeService.startFresh();
        },
        onExit: function(dictionService){
          dictionService.stopListening();
        }
      });
    });
