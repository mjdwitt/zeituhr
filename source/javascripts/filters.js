angular.module('timerFilters', [])

  .filter('minDigits', function () {
    return minDigits;
  })

  .filter('prettyPrintDate', function () {
    return function (then) {
      var now = new Date();
    };
  })

  .filter('prettyPrintDuration', function () {
    return function (time) {
      return (minDigits(time.hours, 2) + ":" + minDigits(time.minutes, 2) + ":" + minDigits(time.seconds, 2));
    };
  });

function minDigits (input, digits) {
  var n = parseInt(input);
  digits = parseInt(digits);

  // sanity check
  if (isNaN(n) || isNaN(digits)) { return input; }

  n = '' + n;
  while (n.length < digits) {
    n = '0' + n;
  }

  return n;
}
