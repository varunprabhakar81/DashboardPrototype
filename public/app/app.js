angular.module('userApp',['appRoutes', 'emailController', 'userControllers','userServices', 'ngAnimate', 'maincontroller', 'authServices','managementController','officeController','officeServices', 'customerController','customerServices',
	'invoiceController', 'invoiceServices', 'configServices', 'employeeServices', 'dailycostServices', 'configController', 'glaccountController','glaccountServices','itemController','itemServices',
	'paymentController', 'journalentryController', 'journalentryServices', 'postingperiodController','postingperiodServices', 
	,'homeController', 'employeeController', 'dailycostController','ngRoute'])
.config(function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptors');
});