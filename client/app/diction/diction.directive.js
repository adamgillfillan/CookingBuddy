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
  .directive('myDialog', ['recipeService', function (recipeService) {
    return function(scope, element, attrs) {
        console.log("inside link");
        // window.speechSynthesis.speak(new SpeechSynthesisUtterance("To begin with your recipe, say, what is the first step?"));
        if ('webkitSpeechRecognition' in window) {
            var recognition = new webkitSpeechRecognition();
            var finished = false;
            var interim_transcript = '';
            var results;
            var final_transcript = '';
            var recognizing = false;
            var message = '';
            var current_step = -1;
            if (recognizing) {
              recognizing = false;
              recognition.stop();
              return;
            }
            recognition.lang = 'en-US';
            recognition.start();
        }
    // };


        recognition.onstart = function() {
            recognizing = true;
        };
        recognition.onerror = function(event) {
            console.log(event.error);
            final_transcript = '';
        };
        recognition.onend = function() {
            if(recognizing)
            recognition.start();
        };
        recognition.onresult = function(event) {
            interim_transcript = '';
            results = '';
            final_transcript = '';
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    results = event.results[i];
                    final_transcript += event.results[i][0].transcript;
                    console.log(event.results[i])
                } else {
                    interim_transcript += event.results[i][0].transcript;
                }
            }
            if (final_transcript != ""){
                console.log(final_transcript);

              // if (final_transcript.match(/first/i) && current_step == -1){
                if (final_transcript.match(/first/i)){
                    current_step += 1;
                    // display_step = current_step + 1;
                    // action = 'first';
                    console.log(final_transcript);
                    //window.speechSynthesis.speak(new SpeechSynthesisUtterance(recipe.steps[current_step]));
                    message = recipeService.currRecipe.steps[current_step];
                    recipeService.speakMessage(message)
                    // changeStylingOfCurrentStep(display_step);
                    // finished = false;
                }
            }
       };
    };
  }]);
  // .directive('myDialog', function() {
  //   return {
  //       restrict: 'E',
  //       transclude: true,
  //       scope: {},
  //       templateUrl: 'my-dialog.html',
  //       link: function (scope, element) {
  //         scope.name = 'Jeff';
  //       }
  //   };
  //   });