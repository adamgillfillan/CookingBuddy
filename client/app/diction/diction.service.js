angular.module('cookingBuddy20App')
  .factory('dictionService', ['$q', '$http', function ($q, $http) {

  	var service = {};
  	service.recognizing = false;
  	
  	service.createRecognitionObject = function(){
  		service.recognition = new webkitSpeechRecognition();
  	};
  	
  	service.beginRecognition = function(){
        service.recognition.start();
        service.recognizing = true;
  	};

    service.speakMessage = function (message){
      return window.speechSynthesis.speak(new SpeechSynthesisUtterance(message));
    };

    service.stopListening = function(){
      if(service.recognition)
      	service.recognition.stop();
    	service.recognizing = false;
    };

    return service;
}]);