'use strict';

angular.module('cookingBuddy20App')
  .factory('dictionService', [ function() {

  	var service = {};
  	service.recognizing = false;
    service.actionTaken = 'nothing';
    service.continue = true;

  	service.createRecognitionObject = function(){
  		service.recognition = new webkitSpeechRecognition();
  	};

  	service.beginRecognition = function(){
        service.recognition.start();
        service.recognizing = true;
  	};

    service.speakMessage = function (message){
      // service.actionTaken = 'message';
      return window.speechSynthesis.speak(new SpeechSynthesisUtterance(message));
    };

    service.stopListening = function(){
      if(service.recognizing){ service.recognition.stop(); }
      service.continue = false;
    	service.recognizing = false;
    };

    return service;
}]);
