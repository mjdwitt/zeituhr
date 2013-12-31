angular.module('timerFilters', []).

  filter('fixedDigits', function () {
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
  });
