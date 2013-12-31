angular.module('timerControllers', []).

  controller('timerCtrl', ['$scope', 'clock',
    function ($scope, clock) {
      $scope.times = [];
      $scope.running = false;
      $scope.buttonMessage = 'Start';

      $scope.clock = clock;

      $scope.toggleTimer = function() {
        if ($scope.running) {
          clock.stop();
          $scope.buttonMessage = 'Start';
        } else {
          clock.start();
          $scope.buttonMessage = 'Stop';
        }

        $scope.running = !$scope.running;
      };
    }]);
