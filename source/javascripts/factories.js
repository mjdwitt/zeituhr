angular.module('timerFactories', []).

  factory('clock', ['$interval',
    function ($interval) {
      var clock = {};

      // private data fields
      var intervalPromise;
      var h = 0;
      var m = 0;
      var s = 0;

      clock.hours   = function () { return h; };
      clock.minutes = function () { return m; };
      clock.seconds = function () { return s; };

      clock.reset = function () {
        h = 0;
        m = 0;
        s = 0;
      };

      clock.start = function () {
        clock.reset();

        var startTime = new Date();

        var tick = function () {
          var now = new Date();
          h = now.getHours() - startTime.getHours();
          m = now.getMinutes() - startTime.getMinutes();
          s = now.getSeconds() - startTime.getSeconds();
        };

        intervalPromise = $interval(tick, 1000);
      };

      clock.stop = function () {
        $interval.cancel(intervalPromise);
      };

      return clock;
    }]);
