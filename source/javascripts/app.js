angular.module('timer', [
  'ngRoute',
  'timerControllers',
  'timerFilters',
  'timerFactories',
  'timerDirectives'
])

  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'partials/timer.html',
          controller: 'timerCtrl'
        })
        .when('/logs', {
          templateUrl: 'partials/logs.html',
          controller: 'logsCtrl'
        })
        .when('/logs/new', {
          templateUrl: 'partials/new-log.html',
          controller: 'newLogCtrl'
        })
        .when('/about', {
          templateUrl: 'partials/about.html',
          controller: 'aboutCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    }]);
