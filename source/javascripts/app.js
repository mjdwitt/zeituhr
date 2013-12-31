angular.module('timer', [
  'ngRoute',
  'timerControllers',
  'timerFilters',
  'timerFactories'
]).

  config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider.
        when('/', {
          templateUrl: 'partials/timer.html',
          controller: 'timerCtrl'
        }).
        otherwise({
          redirectTo: '/'
        });
    }]);
