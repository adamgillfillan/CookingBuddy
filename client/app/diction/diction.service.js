angular.module('cookingBuddy20App')
  .factory('dictionService', ['$q', '$http', function ($q, $http) {

    service.speakMessage = function (message){
      // return {message: "hello from service diction..."};
      return window.speechSynthesis.speak(new SpeechSynthesisUtterance(message));
    };

    return service;
}]);