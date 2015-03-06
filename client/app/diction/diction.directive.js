'use strict';

angular.module('cookingBuddy20App')
  .directive('myDialog', function (recipeService, dictionService, $timeout) {
    return {
        // restrict: 'A',
        // scope: true,
        link: function(scope, element, attrs) {
            element.on('click', function(event2) {
                if ('webkitSpeechRecognition' in window) {
                    //recipeService.sayHello();
                    dictionService.createRecognitionObject();
                    // var recognition = new webkitSpeechRecognition();
                    var recognition = dictionService.recognition;
                    var finished = false;
                    var results;
                    var interimTranscript = '';
                    var finalTranscript = '';
                    var message = '';
                    // var goTo = '';
                    //var display_step = current_step + 1;
                    if (dictionService.recognizing) {
                      dictionService.recognizing = false;
                      dictionService.recognition.stop();
                      return;
                    }
                    recognition.lang = 'en-US';
                    recognition.start();
                }
                else{
                    alert('You must use Chrome for this to work! ' +
                    'Google is ahead of the game and no other browser supports this. ' +
                    'Also, iPhone and iPad does not support HTML5 Web Speech Recognition. ' +
                    'Sorry. Blame Apple. I want to use CookingBuddy on an iPad, too! Try CookingBuddy on any other device!');
                }

                recognition.onstart = function() {
                    dictionService.recognizing = true;
                };
                recognition.onerror = function(event) {
                    console.log(event.error);
                    finalTranscript = '';
                };
                recognition.onend = function() {
                    if(dictionService.recognizing)
                      dictionService.recognition.start();
                };

                var beginRecognition = function() {
                    if (dictionService.continue){
                        dictionService.recognizing = true;
                        dictionService.recognition.start();
                    }
                };

                var changeStepStyling = function(step, color, size) {
                    document.getElementById('steps_list'+step).style.color = color;
                    document.getElementById('steps_list'+step).style.fontSize = size;
                };

                var handleUtterance = function(message) {
                    dictionService.recognizing = false;
                    dictionService.recognition.stop();
                    dictionService.speakMessage(message);
                    // don't listen to CookingBuddy's utterance. temporary hack solution
                    $timeout(beginRecognition, 6000);
                };

                var handleWatchAndListen = function() {
                    scope.$watch(function(scope) { return recipeService.currentStep; },
                        function(newValue, oldValue) {
                            //console.log(oldValue, newValue);
                            if (newValue >= 0 && oldValue < 0){
                                changeStepStyling(newValue, '#4393B9', '2em');
                            } else if (newValue >= 0 && oldValue >= 0){
                                changeStepStyling(oldValue, '', '1em');
                                changeStepStyling(newValue, '#4393B9', '2em');
                            }
                        }
                    );
                    scope.$digest();
                };

                var buildTranscript = function() {
                    interimTranscript = '';
                    results = '';
                    finalTranscript = '';
                    for (var i = event.resultIndex; i < event.results.length; ++i) {
                        if (event.results[i].isFinal) {
                            results = event.results[i];
                            finalTranscript += event.results[i][0].transcript;
                            console.log(event.results[i])
                        } else {
                            interimTranscript += event.results[i][0].transcript;
                        }
                    };
                };

                // if increment is true, increment the currentStep.
                // else set currentStep to value
                var handleMatch = function(regex, value, increment) {
                    //console.log(regex);
                    //if ((regex == '/next/i') && finished){
                    //    message = "There are no more steps in your recipe."
                    //    handleUtterance(message);
                    //}
                    //else if ((regex == '/back/i') && recipeService.currentStep <= 0){
                    //    message = "I can't go back yet."
                    //    handleUtterance(message);
                    //}
                    if (finalTranscript.match(regex)){
                        dictionService.actionTaken = 'something';
                        if (increment)
                            recipeService.currentStep += 1;
                        else
                            recipeService.currentStep = value;
                        message = recipeService.currRecipe.steps[recipeService.currentStep];
                        handleUtterance(message);
                    };

                };

                var handleMatchIngredients = function() {
                    // matches "$item in ingredients pattern: '$quantity $measurement $item'"
                    var re_3 = /How (many|much) (.*) do I need/i;
                    var question = finalTranscript.match(re_3);
                    if (question){
                        for(var j = 0; j < recipeService.currRecipe.ingredients.length; j++){
                            //console.log('ingredients: ' + recipeService.currRecipe.ingredients[j]);
                            if(recipeService.currRecipe.ingredients[j].toLowerCase().indexOf(question[2]) > -1) {
                                //console.log('made it to a question pt 2');
                                message = 'You need ' + recipeService.currRecipe.ingredients[j];
                                //console.log(message);
                                break;
                            }
                        }
                        dictionService.actionTaken = 'something';
                        handleUtterance(message);
                    }
                };

                var handleMatches = function() {
                    dictionService.actionTaken = 'nothing';
                    if (finalTranscript !== ''){
                        //console.log('CurrentStep: ' + recipeService.currentStep);
                        //console.log('Length: ' + recipeService.currRecipe.steps.length);
                        //console.log(finalTranscript);

                        if (recipeService.currentStep === recipeService.currRecipe.steps.length - 1){
                            finished = true;
                            //console.log('Finished!');
                        }
                        if (recipeService.currentStep !== recipeService.currRecipe.steps.length - 1){
                            finished = false;
                        }

                        /* Handle regex matching */
                        if(!finished){
                            handleMatch(/next/i, 1, true);
                        }
                        handleMatch(/first/i, 0, false);
                        handleMatch(/repeat/i, recipeService.currentStep, false);

                        if (recipeService.currentStep > 0)
                            handleMatch(/back/i, recipeService.currentStep-1, false);

                        var re = /step (\d+)/i;
                        //var re = /step/i;
                        var goTo = finalTranscript.match(re);
                        if (goTo){
                            //console.log('matched')
                            if ((goTo[1] -1 >= recipeService.currRecipe.steps.length) || (goTo[1] -1 < 0)) {
                                message = 'You can\'t go to that step.';
                                handleUtterance(message);
                            }
                            else
                                handleMatch(re, goTo[1]-1, false);
                        }

                        handleMatchIngredients();

                        handleWatchAndListen();

                        // checks if back keyword is in transcript && also not at the start of the recipe
                        //if (finalTranscript.match(/Cooking Buddy(.*)back/i) && current_step != 0){

                    };
                }

                var notifyMessage = function() {
                    $.notify({
                        title: (dictionService.actionTaken === 'nothing') ? 'No Action: ' : 'Action Taken!',
                        message: finalTranscript,
                    },{
                        type: (dictionService.actionTaken === 'nothing') ? 'danger' : 'success',
                        allow_dismiss: true,
                        placement: {
                            from: 'top',
                            align: 'center'
                        },
                        offset: {
                            x: 20,
                            y: 65
                        },
                        spacing: 10,
                        z_index: 1031,
                        delay: 5000,
                        timer: 1000,
                        mouse_over: null,
                        animate: {
                            enter: 'animated fadeInDown',
                            exit: 'animated fadeOutUp'
                        },
                        icon_type: 'class',
                        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
                            '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                            '<span data-notify="icon"></span> ' +
                            '<span data-notify="title">{1}</span> ' +
                            '<span data-notify="message">{2}</span>' +
                            '<div class="progress" data-notify="progressbar">' +
                                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                            '</div>' +
                            '<a href="{3}" target="{4}" data-notify="url"></a>' +
                        '</div>'
                    });
                }

                recognition.onresult = function(event) {
                    dictionService.actionTaken = "nothing";
                    buildTranscript();
                    handleMatches();
                    notifyMessage();
                };
            });
        }
    };
  });
