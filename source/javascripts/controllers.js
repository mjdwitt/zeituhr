angular.module('timerControllers', ['timerFactories'])

  .controller('timerCtrl', ['$scope', 'timeLogger',
    function ($scope, timeLogger) {
      $scope.clock = timeLogger.timer();
      $scope.times = timeLogger.entries();

      $scope.buttonMessage = 'Start';

      $scope.toggleTimer = function () {
        if ($scope.clock.running) {
          $scope.clock.stop();
          timeLogger.logCurrent();
          $scope.clock.running = false;
          $scope.buttonMessage = 'Start';
        } else {
          $scope.clock.start();
          $scope.clock.running = true;
          $scope.buttonMessage = 'Stop';
        }
      };
    }]);
