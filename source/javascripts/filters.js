angular.module('timerFilters', [])

  .filter('minDigits', function () {
    return function (input, digits) {
      var n = parseInt(input);
      digits = parseInt(digits);

      // sanity check
      if (isNaN(n) || isNaN(digits)) { return input; }

      n = '' + n;
      while (n.length < digits) {
        n = '0' + n;
      }

      return n;
    };
  })

  .filter('momentCalendar', function () {
    return function (date) {
      return date.calendar();
    };
  })

  .filter('duration', function () {
    return function (time) {
      time = moment.duration(time);
      var str = "";

      if (time.as('seconds') < 60) {
        str = time.seconds() + ' seconds';
      } else if (time.as('minutes') < 60) {
        str = time.minutes() + ' minutes';
      } else {
        str = Math.floor(time.as('hours')) + 'h ' + time.minutes() + 'm';
      }

      return str;
    };
  });
