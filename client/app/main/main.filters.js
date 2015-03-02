angular.module('cookingBuddy20App').filter('userRecipes', function(Auth) {
  return function(items) {
    var current_user = Auth.getCurrentUser();
    var filtered = [];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if(item.creator) {
        console.log(item.creator._id);
        console.log(current_user._id);
        if (item.creator._id == current_user._id) {
          filtered.push(item);
        }
      }
    }
    console.log(filtered)
    return filtered;
  };
});
