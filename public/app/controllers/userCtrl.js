angular.module('userControllers', ['userServices'])

.controller('regCtrl', function($http, $location, $timeout, User) {

	var app = this;
	
	this.regUser = function(regData, valid, confirmed) {
		app.disabled = true;
		app.errorMsg = false;
		app.successMsg = false;
		app.loading = true;

		if (valid && confirmed) {

			User.create(app.regData).then(function(data) {

			if(data.data.success){
				app.loading = false;
				//Create Success Message
				app.successMsg = data.data.message+'...Redirecting';
				//Redirect to Home Message
				$timeout(function(){
					$location.path('/');
				},2000);
				
			}else {
				app.disabled = false;
				app.loading = false;
				//Create Error Message
				app.errorMsg = data.data.message;
			}
		});
		} else {
			//Create an error message
			app.loading = false;
			app.disabled = false;
			app.errorMsg = 'Please ensure form is filled out properly';
		}

	};

	// checkUsername(regData);
	this.checkUsername = function(regData) {
		app.checkingUsername = true;
		app.usernameMsg = false;
		app.usernameInvalid = false;

		User.checkUsername(app.regData).then(function(data) {
			app.checkingUsername = false;

			if (data.data.success) { 
				app.usernameInvalid = false;
				app.usernameMsg = data.data.message;
			} else {
				app.usernameInvalid = true;
				app.usernameMsg = data.data.message;
			}
		});

	};

	// checkEmail(regData);
	this.checkEmail = function(regData) {
		app.checkingEmail = true;
		app.emailMsg = false;
		app.emailInvalid = false;

		User.checkEmail(app.regData).then(function(data) {
			app.checkingEmail = false;

			if (data.data.success) { 
				app.emailInvalid = false;
				app.emailMsg = data.data.message;
			} else {
				app.emailInvalid = true;
				app.emailMsg = data.data.message;
			}
		});

	};

})

.directive('match', function() {
	  return {
	    restrict: 'A',
	    controller: function($scope) { 

	    	$scope.confirmed = false;

	    	$scope.doConfirm = function (values) {
	    		values.forEach(function(ele) {

	    			if ($scope.confirm == ele) { 

	    				$scope.confirmed = true;

	    			} else {
	    				$scope.confirmed = false;
	    			}
	    		});
	    			
	    	}
	    },

	    link: function(scope, element, attrs) {
	    	attrs.$observe('match', function() {
	    		scope.matches = JSON.parse(attrs.match);
	    		scope.doConfirm(scope.matches);
	    	});

	    	scope.$watch('confirm', function() {
	    		scope.matches = JSON.parse(attrs.match);
	    		scope.doConfirm(scope.matches);
	    	});
	    }
	  };
})

.controller('facebookCtrl', function($routeParams, Auth, $location, $window) {
	var app = this;
	app.errorMsg = false;
	app.expired = false;
	app.disabled = true;

	if($window.location.pathname == '/facebookerror') {
		app.errorMsg = 'Facebook e-mail not found in database';
	} else if($window.location.pathname == '/facebook/inactive/error') {
		app.expired = true;
		app.errorMsg = 'Account is not yet activated, please check your e-mail for activation link.';
	} else {
		Auth.facebook($routeParams.token);
		$location.path('/');		
	}

})

.controller('twitterCtrl', function($routeParams, Auth, $location, $window) {
	var app = this;
	app.errorMsg = false;
	app.expired = false;
	app.disabled = true;

	if($window.location.pathname == '/twittererror') {
		app.errorMsg = 'Twitter e-mail not found in database';
	} else if($window.location.pathname == '/twitter/inactive/error') {
		app.expired = true;
		app.errorMsg = 'Account is not yet activated, please check your e-mail for activation link.';
	} else {
		Auth.facebook($routeParams.token);
		$location.path('/');		
	}

})

.controller('googleCtrl', function($routeParams, Auth, $location, $window) {
	var app = this;
	app.errorMsg = false;
	app.expired = false;
	app.disabled = true;

	if($window.location.pathname == '/googleerror') {
		app.errorMsg = 'Google e-mail not found in database';
	} else if($window.location.pathname == '/google/inactive/error') {
		app.expired = true;
		app.errorMsg = 'Account is not yet activated, please check your e-mail for activation link.';
	} else {
		Auth.facebook($routeParams.token);
		$location.path('/');		
	}

})