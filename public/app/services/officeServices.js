angular.module('officeServices', [])

.factory('Office', function($http) {
	officeFactory = {};

	//Office.create(regData)
	officeFactory.addOffice = function(officeData) {
		return $http.post('/api/addoffice', officeData);
	}

	//Office.create(regData)
	officeFactory.getOffices = function() {
		return $http.get('/api/getoffices');
	}

	officeFactory.deleteOffice = function(officename) {
		return $http.delete('/api/deleteoffice/'+officename);
	}

    officeFactory.getOffice = function(id) {
        return $http.get('/api/editoffice/'+id);
    };

    officeFactory.editOffice = function(id) {
        return $http.put('/api/editoffice/',id);
    };

	return officeFactory;
})