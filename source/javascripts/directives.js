angular.module('timerDirectives', [])



  .directive('timerLogo', ['$location',
    function($location) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          scope.location = $location;
          scope.$watch('location.path()', function(path) {
            if (path == '/') {
              element.addClass('hidden');
            } else {
              element.removeClass('hidden');
            }
          });
        }
      };
    }])



  .directive('timerCurrentPage', ['$location',
    function($location) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          var path = attrs.href.substring(2);
          scope.location = $location;
          scope.$watch('location.path()', function(newPath) {
            if (path == newPath) {
              element.addClass('current-page');
            } else {
              element.removeClass('current-page');
            }
          });
        }
      };
    }]);
