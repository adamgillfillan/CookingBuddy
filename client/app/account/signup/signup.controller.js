'use strict';

angular.module('cookingBuddy20App')
  .controller('SignupCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};
          for (var key in form) {
            if (form[key].$error) {
              form[key].$error.mongoose = null;
            }
          }

          if (response.error) {
            // We got some errors, put them into angular
            for (key in response.error.errors) {
              form[key].$error.mongoose = response.error.errors[key].type;
            }
          }
          // Update validity of form fields that match the mongoose errors
          //angular.forEach(err.errors, function(error, field) {
          //  form[field].$setValidity('mongoose', false);
          //  $scope.errors[field] = error.message;
          //});
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
