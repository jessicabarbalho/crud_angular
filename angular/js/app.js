(function () {
	var app = angular.module('user', ['ngRoute'])

	app.config(function ($routeProvider) {
		$routeProvider.when('/user/:userId', { 
			templateUrl: 'user.html',
			controller: 'UserController'
		})
		.when('/index',
			{templateUrl: 'user-list.html',
			controller: 'UsersController'}
		).
		otherwise({
			redirectTo: '/index'
		});
	})

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

		var removeUser = function (user_id) {
			var promise = $http.delete(url+'/'+user_id).
				then(function(response) {
					return response.data;
				}, function(response) {
					return {"status": false}
				});
			
			return promise;
		}

		$scope.deleteUser = function (user, users_list) {
			removeUser(user.id).then(function (promise) {
				if (!promise.status) {
					var index = users_list.indexOf(user);
					if (index != -1) {
						users_list.splice(index,1);
					};
				};
			})
		}
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

	app.controller('UserController', function ($scope, $routeParams) {
		$scope.user_id = $routeParams.userId;
	});
})();