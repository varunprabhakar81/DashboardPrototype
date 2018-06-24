angular.module('dailycostServices', [])

.factory('DailyCost', function($http) {
	dailycostFactory = {};

	//Office.create(regData)
	dailycostFactory.addDailyCost = function(dailycostData) {
		return $http.post('/api/adddailycost', dailycostData);
	}

	//DailyCosts.create(regData)
	dailycostFactory.getDailyCosts = function() {
		return $http.get('/api/getdailycosts');
	}

	dailycostFactory.deleteDailyCost = function(dailycostnumber) {
		return $http.delete('/api/deletedailycost/'+dailycostnumber);
	}

    dailycostFactory.getDailyCost = function(id) {
        return $http.get('/api/editdailycost/'+id);
    };

    dailycostFactory.editDailyCost = function(id) {
        return $http.put('/api/editdailycost/',id);
    };


	return dailycostFactory;
})