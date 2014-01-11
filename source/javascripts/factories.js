angular.module('timerFactories', [])



  .factory('timeLogger', ['$interval',
    function($interval) {
      var service = {};

      // This will be persistent in localStorage at some point. Mocking it out in 
      // memory for now.
      service.entries = [];

      service.current = new Timer();

      return service;

      // private classes and helpers

      function Timer() {
        var intervalPromise;
        var time = {
          hours:   0,
          minutes: 0,
          seconds: 0
        };

        this.hours   = function () { return time.hours; };
        this.minutes = function () { return time.minutes; };
        this.seconds = function () { return time.seconds; };

        this.reset = function () {
          time.hours   = 0;
          time.minutes = 0;
          time.seconds = 0;
        };

        this.running = false;

        this.start = function () {
          this.reset();
          this.running = true;

          var startMillis = Date.now();

          var tick = function () {
            var elapsedMillis = Date.now() - startMillis;
            time = timeFromMilliseconds(elapsedMillis);
          };

          intervalPromise = $interval(tick, 1000);
        };

        this.stop = function () {
          this.running = false;
          $interval.cancel(intervalPromise);
        };

        function timeFromMilliseconds(millis) {
          var time = {};

          // throw away millisecond precision
          var seconds = Math.floor(millis/1000);

          time.hours   = Math.floor(seconds/3600);
          seconds = seconds % 3600;
          time.minutes = Math.floor(seconds/60);
          time.seconds = seconds % 60;

          return time;
        }
      }
    }]);
