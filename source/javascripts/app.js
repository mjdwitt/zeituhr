angular.module('timer', [
  'ngRoute',
  'timerControllers',
  'timerFilters'
]).

  config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider.
        when('/', {
          templateUrl: 'partials/simple.html',
          controller: 'simpleCtrl'
        }).
        otherwise({
          redirectTo: '/'
        });
    }]);
