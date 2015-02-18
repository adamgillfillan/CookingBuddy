'use strict';

angular.module('cookingBuddy20App')
  .directive('myDialog', function (recipeService, $timeout) {
    return function(scope, element, attrs) {
        console.log("inside link");
        // window.speechSynthesis.speak(new SpeechSynthesisUtterance("To begin with your recipe, say, what is the first step?"));
        if ('webkitSpeechRecognition' in window) {
            var recognition = new webkitSpeechRecognition();
            var finished = false;
            var results;
            var interim_transcript = '';
            var final_transcript = '';
            var recognizing = false;
            var message = '';
            var go_to = '';
            //var current_step = -1;
            //var display_step = current_step + 1;
            if (recognizing) {
              recognizing = false;
              recognition.stop();
              return;
            }
            recognition.lang = 'en-US';
            recognition.start();
        }

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

        var beginRecognition = function() {
            recognizing = true;
            recognition.start();
        };

        var changeStepStyling = function(step, color, size) {
            document.getElementById("steps_list"+step).style.color = color;
            document.getElementById("steps_list"+step).style.fontSize = size;
        };

        var handleUtterance = function() {
            message = recipeService.currRecipe.steps[recipeService.currentStep];
            recognizing = false;
            recognition.stop();
            recipeService.speakMessage(message);
            // don't listen to CookingBuddy's utterance. temporary hack solution
            $timeout(beginRecognition, 6000);
        };

        var handleWatchAndListen = function() {
            scope.$watch(function(scope) { return recipeService.currentStep },
                function(newValue, oldValue) {
                    changeStepStyling(oldValue, "", "1em");
                    if (oldValue >= 0)
                        changeStepStyling(newValue, "red", "2em");
                }
            );
            scope.$digest();
        };

        var buildTranscript = function() {
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
            };
        };

        // if increment is true, increment the currentStep.
        // else set currentStep to value
        var handleMatch = function(regex, value, increment) {
            if (final_transcript.match(regex)){
                if (increment)
                    recipeService.currentStep += 1;
                else
                    recipeService.currentStep = value;
                handleUtterance();
            };
        };

        recognition.onresult = function(event) {
            buildTranscript();
            
            if (final_transcript != ""){
                console.log(final_transcript);
                
                /* Handle regex matching */
                handleMatch(/first/i, 0, false);
                handleMatch(/next/i, 1, true);
                handleMatch(/repeat/i, recipeService.currentStep, false);
                
                var re = /step (\d+)/i;
                go_to = final_transcript.match(re);
                if (go_to){
                    handleMatch(re, go_to[1]-1, false);
                }
                
                handleWatchAndListen();
            };
        };
    };
  });