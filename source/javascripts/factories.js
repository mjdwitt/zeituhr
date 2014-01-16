angular.module('timerFactories', [
  'LocalStorageModule'
])

  .config(['localStorageServiceProvider',
    function (localStorageServiceProvider) {
      localStorageServiceProvider.setPrefix('zeituhr');
    }])



  .factory('timeLogger', ['$interval', '$filter', 'localStorageService',
    function($interval, $filter, localStorageService) {
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

        this.date = function () {
          return date.format("YYYY[-]MM[-]DD"); };
        this.time = function () {
          return $filter('duration')(time.as('milliseconds'));
        };
        this.code = function () { return code; };
        this.memo = function () { return memo; };

        this.setDate = function (dateStr) { date = moment(dateStr); };
        this.setCode = function (newCode) { code = newCode; };
        this.setMemo = function (newMemo) { memo = newMemo; };
        this.setTime = function (timeStr) {
          var t = {hours:0, minutes:0, seconds:0},
              r = /([0-9]+) (minutes|seconds)|([0-9]+)h ([0-9]+)(m)/;

          var result = r.exec(timeStr);
          if (result[2] == 'h') {
            t.hours   = result[1];
            t.minutes = result[3];
          } else if (result[2] == 'minutes') {
            t.minutes = result[1];
          } else {
            t.seconds = result[1];
          }

          time = moment.duration(t);
        };

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
