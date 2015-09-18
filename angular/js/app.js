(function () {
	var app = angular.module('user', [])

	var url = 'http://localhost:3000/users'
	var users = [];

	app.controller('UsersController', function ($scope, $http) {
		$scope.users = users;

		var getData = function () {
			var promise = $http.get(url).
				then(function(response) {
					return response.data;
				}, function(response) {
					return {"status": false}
				});
			
			return promise;
		}

		getData().then(function (promise) {
			if (!promise.status) {
				$scope.users = $scope.users.concat(promise);
			};
		});
	});

	app.controller('UserFormController', function ($scope, $http) {
		$scope.user = {};

		var createUser = function (user) {
			var promise = $http.post(url, user).
				then(function(response) {
					return response.data;
				}, function(response) {
					return {"status": false}
				});
			
			return promise;
		}

		$scope.addUser = function (users) {
			createUser($scope.user).then(function (promise) {
				if (!promise.status) {
					users = users.concat(promise);
					$scope.user = {}; // reset the form
				};
			});
		};
	});

	app.config(function($httpProvider) {
		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	});
})();