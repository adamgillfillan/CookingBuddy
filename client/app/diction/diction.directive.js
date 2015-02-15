'use strict';

angular.module('cookingBuddy20App')
  .directive('addStyling', function () {
    return function (scope, element, attrs) {
        element.bind("mouseenter", function() {
            element.addClass(attrs.addStyling);
            console.log("hello from addStyling");    
        });
    };
  })
  .directive('removeStyling', function () {
    return function (scope, element, attrs) {
        element.bind("mouseleave", function() {
            element.removeClass(attrs.addStyling);
            console.log("hello from removeStyling");    
        });
    };
  })