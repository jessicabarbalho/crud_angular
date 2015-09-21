(function () {
	var app = angular.module('user', ['ngRoute', 'templates'])

	app.config(function ($routeProvider) {
		$routeProvider.when('/user/:userId', { 
			templateUrl: 'assets/user.html',
			controller: 'UserController'
		})
		.when('/',
			{templateUrl: 'assets/user-list.html',
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

	app.controller('UserController', function ($scope, $routeParams, $http) {
		$scope.user_id = $routeParams.userId;

		$scope.user = {};
		
		var getUser = function () {
			var promise = $http.get(url+"/"+$scope.user_id).
				then(function(response) {
					return response.data;
				}, function(response) {
					return {"status": false}
				});
			
			return promise;
		}

		getUser().then(function (promise) {
			if (!promise.status) {
				$scope.user = promise;
			};
		});
	});

	app.controller('UserUpdateController', function ($scope, $http, $route) {
		var attUser = function (user) {
			var promise = $http.put(url+"/"+user.id, user).
				then(function(response) {
					return response.data;
				}, function(response) {
					return {"status": false}
				});
			
			return promise;
		}

		$scope.updateUser = function (user) {
			attUser(user).then(function (promise) {
				if (!promise.status) {
					$route.reload();
				};
			});
		};
	});

	app.directive('ngConfirmClick', [ function(){
		return {
			link: function (scope, element, attr) {
				var msg = attr.ngConfirmClick || "Are you sure?";
				var clickAction = attr.confirmedClick;
				element.bind('click',function (event) {
					if ( window.confirm(msg) ) {
						scope.$eval(clickAction)
					}
					else {
						event.stopImmediatePropagation();
						event.preventDefault;
					}
				});
			}
		};
	}]);
})();