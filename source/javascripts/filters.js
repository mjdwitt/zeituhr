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
        str = time.seconds() + ' second';
        if (time.seconds() != 1) {
          str = str + 's';
        }
      } else if (time.as('minutes') < 60) {
        str = time.minutes() + ' minute';
        if (time.minutes() != 1) {
          str = str + 's';
        }
      } else {
        str = Math.floor(time.as('hours')) + 'h ' + time.minutes() + 'm';
      }

      return str;
    };
  });
