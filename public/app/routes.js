var app = angular.module('appRoutes',['ngRoute'])

.config(function($routeProvider,$locationProvider){
	
	$routeProvider

	.when('/', {
		templateUrl: 'app/views/pages/home.html',
		controller: 'homeCtrl',
		controllerAs: 'home'	
	})

	.when('/about', {
		templateUrl: 'app/views/pages/about.html'
	})

	.when('/register', {
		templateUrl: 'app/views/pages/users/register.html',
		controller: 'regCtrl',
		controllerAs: 'register',
		authenticated: false
	})

	.when('/login', {
		templateUrl: 'app/views/pages/users/login.html',
		authenticated: false
	})

	.when('/logout', {
		templateUrl: 'app/views/pages/users/logout.html',
		authenticated: true
	})


	.when('/transactions/invoice', {
		templateUrl: 'app/views/pages/transactions/invoice.html',
		controller: 'invoiceCtrl',
		controllerAs: 'invoice',
		authenticated: true		
	})

	.when('/transactions/invoicepdf', {
		templateUrl: 'app/views/pages/transactions/invoicepdf.html',
		authenticated: true		
	})

	.when('/profile', {
		templateUrl: 'app/views/pages/users/profile.html',
		authenticated: true
	})

	.when('/facebook/:token', {
		templateUrl: 'app/views/pages/users/social/social.html',
		controller: 'facebookCtrl',
		controllerAs: 'facebook',
		authenticated: false
	})

	.when('/facebookerror', {
		templateUrl: 'app/views/pages/users/login.html',
		controller: 'facebookCtrl',
		controllerAs: 'facebook',
		authenticated: false
	})

	.when('/twitter/:token', {
		templateUrl: 'app/views/pages/users/social/social.html',
		controller: 'twitterCtrl',
		controllerAs: 'twitter',
		authenticated: false
	})

	.when('/twittererror', {
		templateUrl: 'app/views/pages/users/login.html',
		controller: 'twitterCtrl',
		controllerAs: 'twitter',
		authenticated: false
	})

	.when('/google/:token', {
		templateUrl: 'app/views/pages/users/social/social.html',
		controller: 'googleCtrl',
		controllerAs: 'google',
		authenticated: false
	})

	.when('/googleerror', {
		templateUrl: 'app/views/pages/users/login.html',
		controller: 'googleCtrl',
		controllerAs: 'google',
		authenticated: false
	})

	.when('/facebook/inactive/error', {
		templateUrl: 'app/views/pages/users/login.html',
		controller: 'facebookCtrl',
		controllerAs: 'facebook',
		authenticated: false
	})

	.when('/google/inactive/error', {
		templateUrl: 'app/views/pages/users/login.html',
		controller: 'googleCtrl',
		controllerAs: 'google',
		authenticated: false
	})

	.when('/twitter/inactive/error', {
		templateUrl: 'app/views/pages/users/login.html',
		controller: 'twitterCtrl',
		controllerAs: 'twitter',
		authenticated: false
	})

	.when('/activate/:token', {
		templateUrl: 'app/views/pages/users/activation/activate.html',
		controller: 'emailCtrl',
		controllerAs: 'email',
		authenticated: false
	})

	.when('/resend', {
		templateUrl: 'app/views/pages/users/activation/resend.html',
		controller: 'resendCtrl',
		controllerAs: 'resend',
		authenticated: false
	})

    // Route: Send Username to E-mail
    .when('/resetusername', {
        templateUrl: 'app/views/pages/users/reset/username.html',
        controller: 'usernameCtrl',
        controllerAs: 'username',
        authenticated: false
    })

    // Route: Send reset password link to E-mail
    .when('/resetpassword', {
        templateUrl: 'app/views/pages/users/reset/password.html',
        controller: 'passwordCtrl',
        controllerAs: 'password',
        authenticated: false
    })

    .when('/reset/:token', {
        templateUrl: 'app/views/pages/users/reset/newpassword.html',
        controller: 'resetCtrl',
        controllerAs: 'reset',
        authenticated: false
    })

    .when('/management', {
        templateUrl: 'app/views/pages/management/management.html',
        controller: 'managementCtrl',
        controllerAs: 'management',
        authenticated: true,
        permission: ['admin', 'moderator']
    })


    .when('/edit/:id', {
        templateUrl: 'app/views/pages/management/edit.html',
        controller: 'editCtrl',
        controllerAs: 'edit',
        authenticated: true,
        permission: ['admin', 'moderator']
    })

    .when('/search', {
        templateUrl: 'app/views/pages/management/search.html',
        controller: 'managementCtrl',
        controllerAs: 'management',
        authenticated: true,
        permission: ['admin', 'moderator']
    })

	.when('/addoffice', {
		templateUrl: 'app/views/pages/administration/office/officeadd.html',
		controller: 'officeCtrl',
		controllerAs: 'office',
		authenticated: true,
		permission: ['admin', 'moderator']
	})

	.when('/manageoffices', {
		templateUrl: 'app/views/pages/administration/office/manageoffices.html',
		controller: 'officeCtrl',
		controllerAs: 'office',
		authenticated: true,
		permission: ['admin', 'moderator']
	})

    .when('/editoffice/:id', {
        templateUrl: 'app/views/pages/administration/office/editoffice.html',
        controller: 'editOfficeCtrl',
        controllerAs: 'editOffice',
        authenticated: true,
        permission: ['admin', 'moderator']
    })

	.when('/addcustomer', {
		templateUrl: 'app/views/pages/relationships/customers/addcustomer.html',
		controller: 'customerCtrl',
		controllerAs: 'customer',
		authenticated: true,
		permission: ['admin', 'moderator']
	})

	.when('/managecustomers', {
		templateUrl: 'app/views/pages/relationships/customers/managecustomers.html',
		controller: 'customerCtrl',
		controllerAs: 'customer',
		authenticated: true,
		permission: ['admin', 'moderator']
	})

    .when('/editcustomer/:id', {
        templateUrl: 'app/views/pages/relationships/customers/editcustomer.html',
        controller: 'editCustomerCtrl',
        controllerAs: 'editCustomer',
        authenticated: true,
        permission: ['admin', 'moderator']
    })

	.when('/addemployee', {
		templateUrl: 'app/views/pages/administration/employee/addemployee.html',
		controller: 'employeeCtrl',
		controllerAs: 'employee',
		authenticated: true,
		permission: ['admin', 'moderator']
	})

	.when('/manageemployees', {
		templateUrl: 'app/views/pages/administration/employee/manageemployees.html',
		controller: 'employeeCtrl',
		controllerAs: 'employee',
		authenticated: true,
		permission: ['admin', 'moderator']
	})

    .when('/editemployee/:id', {
        templateUrl: 'app/views/pages/administration/employee/editemployee.html',
        controller: 'editEmployeeCtrl',
        controllerAs: 'editEmployee',
        authenticated: true,
        permission: ['admin', 'moderator']
    })

	.when('/transactions/managedailycosts', {
		templateUrl: 'app/views/pages/transactions/dailycosts.html',
		controller: 'dailycostCtrl',
		controllerAs: 'dailycost',
		authenticated: true,
		permission: ['admin', 'moderator']
	})

	.when('/config', {
		templateUrl: 'app/views/pages/administration/config.html',
		controller: 'configCtrl',
		controllerAs: 'config',
		authenticated: true,
		permission: ['admin', 'moderator']
	})

	.when('/addglaccount', {
		templateUrl: 'app/views/pages/administration/glaccount/addglaccount.html',
		controller: 'glaccountCtrl',
		controllerAs: 'glaccount',
		authenticated: true,
		permission: ['admin', 'moderator']
	})

	.when('/manageglaccounts', {
		templateUrl: 'app/views/pages/administration/glaccount/manageglaccounts.html',
		controller: 'glaccountCtrl',
		controllerAs: 'glaccount',
		authenticated: true,
		permission: ['admin', 'moderator']
	})

    .when('/editglaccount/:id', {
        templateUrl: 'app/views/pages/administration/glaccount/editglaccount.html',
        controller: 'editGLAccountCtrl',
        controllerAs: 'editGLAccount',
        authenticated: true,
        permission: ['admin', 'moderator']
    })

	.when('/additem', {
		templateUrl: 'app/views/pages/administration/item/additem.html',
		controller: 'itemCtrl',
		controllerAs: 'item',
		authenticated: true,
		permission: ['admin', 'moderator']
	})

	.when('/manageitems', {
		templateUrl: 'app/views/pages/administration/item/manageitems.html',
		controller: 'itemCtrl',
		controllerAs: 'item',
		authenticated: true,
		permission: ['admin', 'moderator']
	})

    .when('/edititem/:id', {
        templateUrl: 'app/views/pages/administration/item/edititem.html',
        controller: 'editItemCtrl',
        controllerAs: 'editItem',
        authenticated: true,
        permission: ['admin', 'moderator']
    })

	.when('/reports/invoicereport', {
		templateUrl: 'app/views/pages/reports/invoicereport.html',
		controller: 'invoicereportCtrl',
		controllerAs: 'invoicereport',
		authenticated: true,
		permission: ['admin', 'moderator']
	})

	.when('/viewinvoice/:id', {
        templateUrl: 'app/views/pages/transactions/invoice.html',
        controller: 'invoiceCtrl',
        controllerAs: 'invoice',
        authenticated: true,
        permission: ['admin', 'moderator']
    })

	.when('/transactions/payment/', {
        templateUrl: 'app/views/pages/transactions/payment.html',
        controller: 'paymentCtrl',
        controllerAs: 'payment',
        authenticated: true,
        permission: ['admin', 'moderator']
    })

	.when('/reports/glreport', {
		templateUrl: 'app/views/pages/reports/glreport.html',
		controller: 'glreportCtrl',
		controllerAs: 'glreport',
		authenticated: true,
		permission: ['admin', 'moderator']
	})

	.when('/addpostingperiod', {
		templateUrl: 'app/views/pages/administration/postingperiod/addpostingperiod.html',
		controller: 'postingperiodCtrl',
		controllerAs: 'postingperiod',
		authenticated: true,
		permission: ['admin', 'moderator']
	})

	.when('/managepostingperiods', {
		templateUrl: 'app/views/pages/administration/postingperiod/managepostingperiods.html',
		controller: 'postingperiodCtrl',
		controllerAs: 'postingperiod',
		authenticated: true,
		permission: ['admin', 'moderator']
	})

    .when('/editpostingperiod/:id', {
        templateUrl: 'app/views/pages/administration/postingperiod/editpostingperiod.html',
        controller: 'editPostingPeriodCtrl',
        controllerAs: 'editPostingPeriod',
        authenticated: true,
        permission: ['admin', 'moderator']
    })

	.otherwise({ redirectTo: '/'});

	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});

});

app.run(['$rootScope', 'Auth', '$location', 'User', function($rootScope, Auth, $location, User) {

	$rootScope.$on('$routeChangeStart', function(event, next, current) { 

		if(next.$$route !== undefined) {
			if(next.$$route.authenticated == true) {
				if(!Auth.isLoggedIn()) {
					event.preventDefault();
					$location.path('/');
				} else if (next.$$route.permission) {
					User.getPermission().then(function(data) {
						if(next.$$route.permission[0] !== data.data.permission) {
							if (next.$$route.permission[1] !== data.data.permission) {
								event.preventDefault();
								$location.path('/');
							}
						}
					});
				}
			} else if(next.$$route.authenticated == false) {
				if(Auth.isLoggedIn()) {
					event.preventDefault();
					$location.path('/profile');
				}
			}		
		}

	});

}]);