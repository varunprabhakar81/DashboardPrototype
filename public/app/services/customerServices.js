angular.module('customerServices', [])

.factory('Customer', function($http) {
	customerFactory = {};

	//Customer.create(regData)
	customerFactory.addCustomer = function(customerData) {
		return $http.post('/api/addcustomer', customerData);
	}

	//Customer.create(regData)
	customerFactory.getCustomers = function() {
		return $http.get('/api/getcustomers');
	}

	customerFactory.deleteCustomer = function(customername) {
		return $http.delete('/api/deletecustomer/'+customername);
	}

    customerFactory.getCustomer = function(id) {
        return $http.get('/api/editcustomer/'+id);
    };

    customerFactory.editCustomer = function(id) {
        return $http.put('/api/editcustomer/',id);
    };

	return customerFactory;
})