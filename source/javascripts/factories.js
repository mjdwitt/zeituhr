angular.module('timerFactories', [
  'LocalStorageModule'
])

  .config(['localStorageServiceProvider',
    function (localStorageServiceProvider) {
      localStorageServiceProvider.setPrefix('zeituhr');
    }])



  .factory('timeLogger', ['$interval', 'localStorageService',
    function($interval, localStorageService) {
      var service = {};

      // This will be persistent in localStorage at some point. Mocking it out in 
      // memory for now.
      var timer = new Timer();
      service.timer   = function () { return timer; };

      var entries = loadEntries();
      service.entries = function () { return entries; };

      service.logCurrent = function () {
        entries.unshift(timer.toLog());
        localStorageService.add('entries', entries);
      };

      service.clearLogs = function () {
        while (entries.length > 0) { entries.pop(); }
        localStorageService.remove('entries');
      };

      return service;

      // private classes and helpers

      function loadEntries() {
        return (_(localStorageService.get('entries') || [])
          .map(function(log) {
            log.date = new Date(Date.parse(log.date));
            return log;
          })
        );
      }

      function Timer() {
        var intervalPromise;
        var date;
        var code;
        var memo;
        var time = {
          hours:   0,
          minutes: 0,
          seconds: 0
        };

        this.hours   = function () { return time.hours; };
        this.minutes = function () { return time.minutes; };
        this.seconds = function () { return time.seconds; };

        this.date = function () { return date.toDateString(); };
        this.time = function () { return date.toTimeString(); };
        this.code = function () {};
        this.memo = function () {};

        this.reset = function () {
          time.hours   = 0;
          time.minutes = 0;
          time.seconds = 0;
        };

        this.running = false;

        this.start = function () {
          this.reset();
          this.running = true;
          date = new Date();

          var startMillis = date.getTime();

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

        this.toLog = function () {
          return {
            date: date,
            code: this.code(),
            memo: this.memo(),
            time: {
              hours:   time.hours,
              minutes: time.minutes,
              seconds: time.seconds
            }
          };
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
