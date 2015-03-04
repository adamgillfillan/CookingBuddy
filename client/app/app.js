angular.module('cookingBuddy20App', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/main');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
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
