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
            log.date = moment(log.date);
            return log;
          })
        );
      }

      function Timer() {
        var intervalPromise;
        var date;
        var code;
        var memo;
        var time = moment.duration();

        this.hours   = function () { return time.hours();   };
        this.minutes = function () { return time.minutes(); };
        this.seconds = function () { return time.seconds(); };

        this.date = function () { return date.calendar(); };
        this.time = function () { return time.humanize(); };
        this.code = function () {};
        this.memo = function () {};

        this.reset = function () {
          time = moment.duration();
        };

        this.running = false;

        this.start = function () {
          this.reset();
          this.running = true;
          date = moment();

          var tick = function () {
            time.add(moment.duration(1, 's'));
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
            time: time.as('milliseconds')
          };
        };
      };
    }]);
