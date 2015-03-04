'use strict';

angular.module('cookingBuddy20App').filter('userRecipes', function(Auth) {
  return function(items) {
    var currentUser = Auth.getCurrentUser();
    return items.filter(function (item){
      if(item.creator)
        return item.creator._id === currentUser._id;
    });
  };
});
