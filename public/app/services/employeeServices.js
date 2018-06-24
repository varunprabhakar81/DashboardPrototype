angular.module('employeeServices', [])

.factory('Employee', function($http) {
	employeeFactory = {};

	//Employee.create(regData)
	employeeFactory.addEmployee = function(employeeData) {
		return $http.post('/api/addemployee', employeeData);
	}

	//Employee.create(regData)
	employeeFactory.getEmployees = function() {
		return $http.get('/api/getemployees');
	}

	employeeFactory.deleteEmployee = function(employeename) {
		return $http.delete('/api/deleteemployee/'+employeename);
	}

    employeeFactory.getEmployee = function(id) {
        return $http.get('/api/editemployee/'+id);
    };

    employeeFactory.editEmployee = function(id) {
        return $http.put('/api/editemployee/',id);
    };

	return employeeFactory;
})