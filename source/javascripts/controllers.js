angular.module('timerControllers', []).

  controller('simpleCtrl', ['$scope',
    function ($scope) {
      $scope.times = [];
      $scope.running = false;
      $scope.buttonMessage = 'Start';

      $scope.current = {
        hours: 0,
        minutes: 0,
        seconds: 0
      };

      $scope.toggleTimer = function() {
        if ($scope.running) {
          $scope.buttonMessage = 'Start';
        } else {
          $scope.buttonMessage = 'Stop';
        }

        $scope.running = !$scope.running;
      };
    }]);
