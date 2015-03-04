angular.module('cookingBuddy20App')
  .controller('ViewCtrl', function ($scope, $modal, $log) {

    //$scope.modal = $modal({title: 'My Title', content: 'My Content', show: true});
    //var modal = $modal({title: 'My Title', content: 'hello'});

    //$scope.items = ['item1', 'item2', 'item3'];
    $scope.items = ['What is first?',
                    'What is next?',
                    'Go back.',
                    'Repeat that.',
                    'Go to step 5.',
                    'How many eggs do I need?'];
    $scope.open = function (size) {

      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

  })

  .controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

    $scope.items = items;

    $scope.ok = function () {
      $modalInstance.dismiss('done');
    };
  });
