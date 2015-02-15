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
    //   if ('webkitSpeechRecognition' in window) {
    //     var recognition = new webkitSpeechRecognition();
    //     var finished = false;
    //     var interim_transcript = '';
    //     var results;
    //     var final_transcript = '';
    //     var recognizing = false;
    //     var dialogue_message = '';
    //     var current_step = -1;
    //     if (recognizing) {
    //       recognizing = false;
    //       recognition.stop();
    //       return;
    //     }
    //     recognition.lang = 'en-US';
    //     recognition.start();
    //   }
    // // };


    //   recognition.onstart = function() {
    //     recognizing = true;
    //   };
    //   recognition.onerror = function(event) {
    //     console.log(event.error);
    //     final_transcript = '';
    //   };
    //   recognition.onend = function() {
    //     if(recognizing)
    //       recognition.start();
    //   };
    //   recognition.onresult = function(event) {
    //     interim_transcript = '';
    //     results = '';
    //     final_transcript = '';
    //     for (var i = event.resultIndex; i < event.results.length; ++i) {
    //       if (event.results[i].isFinal) {
    //         results = event.results[i];
    //         final_transcript += event.results[i][0].transcript;
    //         console.log(event.results[i])
    //       } else {
    //         interim_transcript += event.results[i][0].transcript;
    //       }
    //     }
    //     if (final_transcript != ""){
    //       console.log(final_transcript);

    //       // if (final_transcript.match(/first/i) && current_step == -1){
    //       if (final_transcript.match(/first/i)){
    //         current_step += 1;
    //         // display_step = current_step + 1;
    //         // action = 'first';
    //         console.log(final_transcript);
    //         //window.speechSynthesis.speak(new SpeechSynthesisUtterance(recipe.steps[current_step]));
    //         message = recipeService.currRecipe.steps[current_step];
    //         recipeService.speakMessage(message)
    //         // changeStylingOfCurrentStep(display_step);
    //         // finished = false;
    //       }
    //     }


    //   };
    };
  });