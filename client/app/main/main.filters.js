angular.module('cookingBuddy20App').filter('userRecipes', function(Auth) {
  return function(items) {
    var current_user = Auth.getCurrentUser();
    return items.filter(function (item){
      if(item.creator)
        return item.creator._id == current_user._id;
    });
  };
});
