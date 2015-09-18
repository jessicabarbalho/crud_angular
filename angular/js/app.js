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

		$scope.addUser = function (users_list) {
			createUser($scope.user).then(function (promise) {
				if (!promise.status) {
					users_list.push(promise);
					$scope.user = {}; // reset the form
				};
			});
		};
	});
})();