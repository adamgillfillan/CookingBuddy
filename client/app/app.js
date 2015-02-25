angular.module('cookingBuddy20App', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/main');

    $locationProvider.html5Mode(true);
  });

  // .run(function($rootScope){
  //   $rootScope.$on("$routeChangeStart", function (event, next, current) {
  //       if (sessionStorage.restorestate == "true") {
  //           $rootScope.$broadcast('restorestate'); //let everything know we need to restore state
  //           sessionStorage.restorestate = false;
  //           console.log("11111111111111111111111hello from app.js, restorestate")
  //       }
  //   });
  //   window.onbeforeunload = function(event) {
  //       $rootScope.$broadcast('savestate');
  //       console.log("2222222222hello from app.js, savestate")
  //   };
  // });
