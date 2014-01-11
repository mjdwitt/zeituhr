angular.module('timerControllers', ['timerFactories'])

  .controller('timerCtrl', ['$scope', 'timeLogger',
    function ($scope, timeLogger) {
      $scope.clock = timeLogger.current;
      $scope.times = timeLogger.entries;

      $scope.buttonMessage = 'Start';

      $scope.toggleTimer = function () {
        if ($scope.clock.running) {
          $scope.clock.stop();
          $scope.clock.running = false;
          $scope.buttonMessage = 'Start';
        } else {
          $scope.clock.start();
          $scope.clock.running = true;
          $scope.buttonMessage = 'Stop';
        }
      };
    }]);
