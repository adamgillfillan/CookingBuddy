'use strict';
// <!-- var RecipeSchema = new Schema({
//     name        : String,
//     image       : String,
//     time        : {
//         prep    : Number,
//         cook    : Number,
//         cool    : Number,
//         ready   : Number
//     },
//     ingredients : [String],
//     steps       : [String]
// }); -->

angular.module('cookingBuddy20App')
  .controller('MainCtrl', function ($scope, recipeService, $location, $state, User, Auth) {

    $scope.recipeService = recipeService;
    recipeService.getAllRecipes();
    $scope.ingredients = [{id: 'ingredient0'}];
    $scope.steps = [{id: 'step0'}];

    $scope.addNewIngredient = function () {
      var newItemNo = $scope.ingredients.length + 1;
      $scope.ingredients.push({'id':'ingredient'+newItemNo});
    };

    $scope.addNewStep = function () {
      var newItemNo = $scope.ingredients.length + 1;
      $scope.steps.push({'id':'step'+newItemNo});
    };

    $scope.viewRecipe = function (recipe) {
      // recipeService.getRecipe(recipe._id);
      $location.path('/' + recipe._id);
    };

    $scope.deleteRecipe = function () {
      recipeService.deleteRecipe(recipeService.currRecipe._id);
      $location.path('/');
    };

    $scope.newRecipe = { name: '', image: '', time: {prep: '', cook: '', cool:   '', ready: ''}, ingredients: [], steps: [], creator: '' }

    $scope.addRecipe = function () {
      $scope.newRecipe.creator = Auth.getCurrentUser();
      recipeService.createRecipe($scope.newRecipe);

      $scope.newRecipe = { name: '', image: '', time: {prep: '', cook: '', cool: '', ready: ''}, ingredients: [], steps: [], creator: '' }
      $scope.ingredients = [{id: 'ingredient0'}];
      $scope.steps = [{id: 'step0'}];
    };

    // $scope.update = function(recipe){
    //     recipeService.currRecipe = recipe;
    // };
  });

  // need to refactor to own module
  // .controller('DictionCtrl', function ($scope, recipeService, $timeout){
  //   //$scope.dictionService = recipeService;

  //   $scope.beginDiction = function (message){
  //     recipeService.beginDiction(message);
  //     // console.log("hello from diction ctrl");
  //     // console.log(myMessage.message);
  //       // console.log("hello from window load");

  //       // window.speechSynthesis.speak(new SpeechSynthesisUtterance("I assist you with cooking meals based on a recipe."));
  //       // window.speechSynthesis.speak(new SpeechSynthesisUtterance("You can say things like, how many steps are left?"));
  //       // window.speechSynthesis.speak(new SpeechSynthesisUtterance("Or: what is the next step?"));
  //     // });
  //   };

  //   $scope.introDiction = function(){
  //     window.speechSynthesis.speak(new SpeechSynthesisUtterance("Hello. I am your Cooking Buddy."));
  //     window.speechSynthesis.speak(new SpeechSynthesisUtterance("I assist you with cooking meals based on a recipe."));
  //     window.speechSynthesis.speak(new SpeechSynthesisUtterance("You can say things like, how many steps are left?"));
  //     window.speechSynthesis.speak(new SpeechSynthesisUtterance("Or: what is the next step?"));
  //     $timeout(introB, 14000);
  //   };

  //   var introB = function (){
  //     window.speechSynthesis.speak(new SpeechSynthesisUtterance("To begin with your recipe, say, what is the first step?"));
  //   }
  // });
