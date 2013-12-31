angular.module('timerFactories', []).

  factory('clock', ['$interval',
    function ($interval) {
      var clock = {};

      // private data fields
      var intervalPromise;
      var time = {
        h: 0,
        m: 0,
        s: 0
      }

      clock.hours   = function () { return time.h; };
      clock.minutes = function () { return time.m; };
      clock.seconds = function () { return time.s; };

      clock.reset = function () {
        time.h = 0;
        time.m = 0;
        time.s = 0;
      };

      clock.start = function () {
        clock.reset();

        var startMillis = Date.now()

        var tick = function () {
          var elapsedMillis = Date.now() - startMillis;
          time = timeFromMilliseconds(elapsedMillis);
        };

        intervalPromise = $interval(tick, 1000);
      };

      clock.stop = function () {
        $interval.cancel(intervalPromise);
      };

      return clock;

      // private functions

      function timeFromMilliseconds(millis) {
        var time = {};

        // throw away millisecond precision
        var seconds = Math.floor(millis/1000);

        time.h = Math.floor(seconds/3600);
        seconds = seconds % 3600;
        time.m = Math.floor(seconds/60);
        time.s = seconds % 60;

        return time;
      }
    }]);
