angular.module('timerControllers', ['timerFactories'])



  .controller('debugCtrl', ['$scope', '$location',
    function($scope, $location) {
      $scope.location = $location;
    }])



  .controller('timerCtrl', ['$scope', 'timeLogger',
    function ($scope, timeLogger) {
      $scope.clock = timeLogger.timer();
      $scope.logs = timeLogger.entries();

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
    }])



  .controller('logsCtrl', ['$scope', 'timeLogger',
    function ($scope, timeLogger) {
      $scope.logs = timeLogger.entries();
    }]);
