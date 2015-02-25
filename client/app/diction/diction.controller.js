angular.module('cookingBuddy20App')
  .controller('DictionCtrl', function ($scope, recipeService, $timeout){
    //$scope.dictionService = recipeService;

    // General use case for speech synthesis utterance
    $scope.speakMessage = function (message){
      recipeService.speakMessage(message);
    };

    $scope.introDiction = function(){
      // window.speechSynthesis.speak(new SpeechSynthesisUtterance("Hello. I am your Cooking Buddy."));
      // window.speechSynthesis.speak(new SpeechSynthesisUtterance("I assist you with cooking meals based on a recipe."));
      // window.speechSynthesis.speak(new SpeechSynthesisUtterance("You can say things like, how many steps are left?"));
      // window.speechSynthesis.speak(new SpeechSynthesisUtterance("Or: what is the next step?"));
      $timeout(introB, 2000);
    };

    var introB = function (){
      window.speechSynthesis.speak(new SpeechSynthesisUtterance("To begin with your recipe, say, what is the first step?"));
      dictionHandling();
    };

    var dictionHandling = function (){
      console.log("hello from dictionHandling");
    };

    
  });