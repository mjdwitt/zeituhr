angular.module('timerControllers', ['timerFactories'])



  .controller('timerCtrl', ['$scope', '$location', 'timeLogger',
    function ($scope, $location, timeLogger) {
      $scope.clock = timeLogger.timer();
      $scope.logs = timeLogger.entries();

      $scope.buttonMessage = function () {
        return $scope.clock.running ? 'Stop' : 'Start';
      };

      $scope.toggleTimer = function () {
        if ($scope.clock.running) {
          $scope.clock.stop();
          $scope.clock.running = false;
          $location.path("/logs/new");
        } else {
          $scope.clock.start();
          $scope.clock.running = true;
        }
      };
    }])



  .controller('logsCtrl', ['$scope', 'timeLogger',
    function ($scope, timeLogger) {
      $scope.logs = timeLogger.entries();
      $scope.clearLogs = timeLogger.clearLogs
    }])


  .controller('newLogCtrl', ['$scope', '$location', 'timeLogger',
    function ($scope, $location, timeLogger) {
      var newLog = timeLogger.timer();

      $scope.logs = timeLogger.entries();
      $scope.timeStr = newLog.time();
      $scope.dateStr = newLog.date();

      $scope.cancel = function () {
        newLog.reset();
        $location.path("/");
      };

      $scope.addLog = function () {
        newLog.setCode($scope.code);
        newLog.setMemo($scope.memo);
        newLog.setTime($scope.timeStr);
        newLog.setDate($scope.dateStr);
        timeLogger.logCurrent();
        newLog.reset();
        $location.path("/");
      };
    }])



  .controller('aboutCtrl', [
    function () {
    }]);
