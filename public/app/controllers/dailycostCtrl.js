angular.module('dailycostController', ['dailycostServices'])

.controller('dailycostCtrl', function($http, $location, $timeout, $scope, DailyCost, Employee, Config) {

    var app = this;

    app.loading = true; // Start loading icon on page load
    app.accessDenied = true; // Hide table while loading
    app.errorMsg = false; // Clear any error messages
    app.editAccess = false; // Clear access on load
    app.deleteAccess = false; // CLear access on load
    app.limit = 20; // Set a default limit to ng-repeat
    app.searchLimit = undefined; // Set the default search page results limit to zero
    app.showDailyCostEditModal = false;
    app.choiceMade = false;
    app.editing = false;

    app.employeecosts = [];

    $scope.GLTypes = Config.DailyCostTypes;

    app.dates = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    app.days = [{day:'mon', cost:0},
                {day:'tue', cost:0},
                {day:'wed', cost:0},
                {day:'thu', cost:0},
                {day:'fri', cost:0},
                {day:'sat', cost:0},
                {day:'sun', cost:0}];

  //     date: { type: String, lowercase: true, required: true},
  // employees: [{ type: Schema.Types.ObjectId, ref: 'Employee'}],
  // laborcost:{ type: Number, required: true},
  // materialcost:{ type: Number, required: true},
  // totalcost:{ type: Number, required: true}

    app.dailycostData = [{date:'mon',laborcost:0, employees : []},
                         {date:'tue',laborcost:0, employees : []},
                         {date:'wed',laborcost:0, employees : []},
                         {date:'thu',laborcost:0, employees : []},
                         {date:'fri',laborcost:0, employees : []},
                         {date:'sat',laborcost:0, employees : []},
                         {date:'sun',laborcost:0, employees : []}];
    
    addDailyCost = function(dailycostData, valid) {
        app.disabled = true;
        app.errorMsg = false;
        app.successMsg = false;
        app.loading = true;

        if (valid) {
            DailyCost.addDailyCost(dailycostData).then(function(data) {
            if(data.data.success){
                app.loading = false;
                app.successMsg = data.data.message;              
            }else {
                app.disabled = false;
                app.loading = false;
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

    // Function: get all the dailycostss from database
    function getDailyCosts() {
        // Runs function to get all the dailycostss from database
        DailyCost.getDailyCosts().then(function(data) {
            // Check if able to get data from database
            if (data.data.success) {
                // Check which permissions the logged in user has
                if (data.data.permission === 'admin' || data.data.permission === 'moderator') {

                    if(data.data.dailycosts.length > 0) {
                        app.dailycosts =  data.data.dailycosts; // Assign dailycostss from database to variable

                        app.dailycostData = JSON.parse(JSON.stringify(app.dailycosts))

                        // app.dailycostData = angular.copy(app.dailycosts);

                        // app.dailycostData = app.dailycosts.slice();

                        // console.log(app.dailycostData);

                        if(app.dailycosts.length > 0) {
                            for (var m =0; m<app.dailycosts.length; m++) {
                                for (var l=0; l<app.dailycosts[m].employees.length; l++) {
                                    var employee_found = app.employees.find(o => o._id === app.dailycosts[m].employees[l]._id);
                                    employee_found.costs += app.dailycosts[m].employees[l].hourlycost;
                                    switch(app.dailycosts[m].date) {
                                        case 'mon':
                                            employee_found.mon = true;
                                            app.days[0].cost += app.dailycosts[m].employees[l].hourlycost;
                                            // app.dailycostData[0].employees.push(employee_found);
                                            break;
                                        case 'tue':
                                            employee_found.tue = true;
                                            app.days[1].cost += app.dailycosts[m].employees[l].hourlycost;
                                            // app.dailycostData[1].employees.push(employee_found);
                                            break;
                                        case 'wed':
                                            employee_found.wed = true;
                                            app.days[2].cost += app.dailycosts[m].employees[l].hourlycost;
                                            // app.dailycostData[2].employees.push(employee_found);
                                            break;
                                        case 'thu':
                                            employee_found.thu = true;
                                            app.days[3].cost += app.dailycosts[m].employees[l].hourlycost;
                                            // app.dailycostData[3].employees.push(employee_found);
                                            break;
                                        case 'fri':
                                            employee_found.fri = true;
                                            app.days[4].cost += app.dailycosts[m].employees[l].hourlycost;
                                            // app.dailycostData[4].employees.push(employee_found);
                                            break;
                                        case 'sat':
                                            employee_found.sat = true;
                                            app.days[5].cost += app.dailycosts[m].employees[l].hourlycost;
                                            // app.dailycostData[5].employees.push(employee_found);
                                            break;
                                        case 'sun':
                                            employee_found.sun = true;
                                            app.days[6].cost += app.dailycosts[m].employees[l].hourlycost;
                                            // app.dailycostData[6].employees.push(employee_found);
                                            break;
                                    } 
                                }
                            }
                        }
                    }

                    // console.log(app.dailycosts);

                    app.loading = false; // Stop loading icon
                    app.accessDenied = false; // Show table

                    // Check if logged in user is an admin or moderator
                    if (data.data.permission === 'admin') {
                        app.editAccess = true; // Show edit button
                        app.deleteAccess = true; // Show delete button
                    } else if (data.data.permission === 'moderator') {
                        app.editAccess = true; // Show edit button
                    }
                } else {
                    app.errorMsg = 'Insufficient Permissions'; // Reject edit and delete options
                    app.loading = false; // Stop loading icon
                }
                // console.log(app.employees);
                // console.log(app.days);
                // console.log(app.dailycostData);
            } else {
                app.errorMsg = data.data.message; // Set error message
                app.loading = false; // Stop loading icon
            }
        });
    }

    // Function: get all the employees from database
    function getEmployees() {
        // Runs function to get all the dailycostss from database
        Employee.getEmployees().then(function(data) {
            // Check if able to get data from database
            if (data.data.success) {
                // Check which permissions the logged in user has
                if (data.data.permission === 'admin' || data.data.permission === 'moderator') {
                    app.employees = data.data.employees; // Assign dailycostss from database to variable

                    for(var j=0; j < app.employees.length; j++) {
                        app.employees[j].costs = 0;
                    }

                    app.loading = false; // Stop loading icon
                    app.accessDenied = false; // Show table

                    // Check if logged in user is an admin or moderator
                    if (data.data.permission === 'admin') {
                        app.editAccess = true; // Show edit button
                        app.deleteAccess = true; // Show delete button
                    } else if (data.data.permission === 'moderator') {
                        app.editAccess = true; // Show edit button
                    }
                } else {
                    app.errorMsg = 'Insufficient Permissions'; // Reject edit and delete options
                    app.loading = false; // Stop loading icon
                }
            } else {
                app.errorMsg = data.data.message; // Set error message
                app.loading = false; // Stop loading icon
            }
        });
    }

    getEmployees(); // Invoke function to get dailycostss from databases
    getDailyCosts(); // Invoke function to get dailycostss from databases
    

    app.dailycostEditModal = function() {
        $("#glModal").modal({ backdrop: "static" }); // Open modal
        // Give user 10 seconds to make a decision 'yes'/'no'
        $timeout(function() {
                if (!app.choiceMade) {
                    $("#glModal").modal('hide');// If no choice is made after 10 seconds, select 'no' for them
                }
            }, 2500);
    };


    // Function: Show more results on page
    app.showMore = function(number) {
        app.showMoreError = false; // Clear error message
        // Run function only if a valid number above zero
        if (number > 0) {
            app.limit = number; // Change ng-repeat filter to number requested by user
        } else if (number == '') {
            app.limit = undefined;
        } else {
            app.showMoreError = 'Please enter a valid number'; // Return error if number not valid
        }
    };

    // Function: Show all results on page
    app.costchanged = function(employee, clicked, day) {
        for (var i=0; i < app.employees.length; i++) {
            if(app.employees[i]._id == employee._id) {
                if(clicked) {
                        var dayfound = app.days.find(o => o.day === day);

                        if(dayfound){
                            dayfound.cost += parseInt(employee.hourlycost);
                        } else {
                            //shouldn't happen
                        }

                        app.days[day] += parseInt(employee.hourlycost);
                        // console.log(app.dailycostData);
                        // console.log(day);

                        var datafound = app.dailycostData.find(o => o.date === day);

                        if(datafound){
                            datafound.laborcost += parseInt(employee.hourlycost);
                            datafound.materialcost = 0;
                            datafound.totalcost = datafound.laborcost + datafound.materialcost;
                            datafound.employees.push(employee);
                        } else {
                            var newlaborcost = parseInt(employee.hourlycost);
                            var newmaterialcost = 0;
                            var newtotalcost = newlaborcost + newmaterialcost;
                            app.dailycostData.push({date: day,
                                                    laborcost: newlaborcost,
                                                    employees:[employee],
                                                    materialcost:newmaterialcost,
                                                    totalcost:newtotalcost
                                                    });
                        }

                        app.employees[i].costs += parseInt(employee.hourlycost);

                } else {
                    var dayfound2 = app.days.find(o => o.day === day);

                    if(dayfound2){
                        if(dayfound2.cost > employee.hourlycost) {
                            dayfound2.cost -= parseInt(employee.hourlycost);
                        } else {
                            dayfound2.cost = 0;
                        }
                    } else {
                        //shouldn't happen
                    }

                    // console.log(app.dailycostData);
                    
                    var datafound2 = app.dailycostData.find(o => o.date === day);

                    // console.log(datafound2);
                    if(datafound2){
                        datafound2.laborcost -= parseInt(employee.hourlycost);
                        datafound2.totalcost = datafound2.laborcost + datafound2.materialcost;
                        datafound2.employees.splice(datafound2.employees.findIndex(item=>item._id == employee._id),1);
                    } else {
                        app.dailycostData.push({date: day,laborcost:parseInt(employee.hourlycost), employees:[employee]});
                    }

                    app.employees[i].costs -= parseInt(employee.hourlycost);

                    // console.log(datafound2);
                    // // app.dailycostData[day].laborcost = app.days[day];
                    // // app.dailycostData[day].employees.push(employee);

                    // app.dailycostData[day].employees.splice(app.dailycostData[day].employees.findIndex(item => item._id === employee._id), 1)
                }
                return;
            }
        }
       // }

        // app.employeecosts.push({employee:employee,costs:employee.hourlycost});
    };

    // Function: Show all results on page
    app.showAll = function() {
        app.limit = undefined; // Clear ng-repeat limit
        app.showMoreError = false; // Clear error message
    };

    // Function: Delete a dailycost
    app.deleteDailyCost = function(dailycostname) {
        // Run function to delete a user
        DailyCost.deleteDailyCost(dailycostname).then(function(data) {
            // Check if able to delete user
            if (data.data.success) {
                getDailyCost(); // Reset users on page
            } else {
                app.showMoreError = data.data.message; // Set error message
            }
        });
    };

    // Function: Perform a basic search function
    app.search = function(searchKeyword, number) {
        // Check if a search keyword was provided
        if (searchKeyword) {
            // Check if the search keyword actually exists
            if (searchKeyword.length > 0) {
                app.limit = 0; // Reset the limit number while processing
                $scope.searchFilter = searchKeyword; // Set the search filter to the word provided by the user
                app.limit = number; // Set the number displayed to the number entered by the user
            } else {
                $scope.searchFilter = undefined; // Remove any keywords from filter
                app.limit = 0; // Reset search limit
            }
        } else {
            $scope.searchFilter = undefined; // Reset search limit
            app.limit = undefined; // Set search limit to zero
        }
    };

    // Function: Clear all fields
    app.clear = function() {
        $scope.number = undefined; // Set the filter box to 'Clear'
        app.limit = undefined; // Clear all results
        $scope.searchKeyword = undefined; // Clear the search word
        $scope.searchFilter = undefined; // Clear the search filter
        app.showMoreError = false; // Clear any errors
        $scope.advancedSearchFilter = {};
        $scope.searchByUsername = undefined;
        $scope.searchByEmail = undefined;
        $scope.searchByName = undefined;
    };

    // Function: Clear all fields
    app.editenabled = function() {
        app.editing = true;
        // app.employees[0].mon = true;
        // $scope.mon[app.employees[0]];
    };

    app.savecosts = function() {
        for(var k=0; k < app.dailycostData.length; k++) {
            // if(app.dailycostData[k].laborcost != 0) {
                if(app.dailycosts) {
                    var costs_found = app.dailycosts.find(o => o.date === app.dailycostData[k].date);

                    if(costs_found){
                        // for(var b=0; b<app.dailycostData[k].employees.length;b++) {
                        //     if(costs_found.employees[b]._id != app.dailycostData[k].employees._id)
                        //     costs_found.employees.push(app.dailycostData[k].employees[b]);
                        //     costs_found.laborcost += app.dailycostData[k].employees[b].hourlycost;
                            costs_found = app.dailycostData[k];
                        // }
                        
                        // costs_found.materialcost = 0;
                        // costs_found.totalcost = costs_found.laborcost + parseInt(costs_found.materialcost);

                        DailyCost.editDailyCost(costs_found).then(function(data) {
                            // Check if able to edit the user's name
                            if (data.data.success) {
                                app.successMsg = data.data.message; // Set success message
                            } else {
                                app.errorMsg = data.data.message; // Clear any error messages
                                app.disabled = false; // Enable form for editing
                            }
                        });

                    } else {
                        // console.log(app.dailycostData[k]);
                        // app.dailycostData[k].materialcost = 0;
                        // app.dailycostData[k].totalcost = app.dailycostData[k].laborcost + app.dailycostData[k].materialcost;
                        addDailyCost(app.dailycostData[k],true);
                    }                    
                } else {
                    // app.dailycostData[k].materialcost = 0;
                    // app.dailycostData[k].totalcost = app.dailycostData[k].laborcost + app.dailycostData[k].materialcost;
                    addDailyCost(app.dailycostData[k],true);
                }
            // }
        }
        $timeout(function() {
            app.editing = false;
            location.reload();
            // $location.path('transactions/managedailycosts');
        }, 2000);
    };

    // Function: Perform an advanced, criteria-based search
    app.advancedSearch = function(searchByUsername, searchByEmail, searchByName) {
        // Ensure only to perform advanced search if one of the fields was submitted
        if (searchByUsername || searchByEmail || searchByName) {
            $scope.advancedSearchFilter = {}; // Create the filter object
            if (searchByUsername) {
                $scope.advancedSearchFilter.username = searchByUsername; // If username keyword was provided, search by username
            }
            if (searchByEmail) {
                $scope.advancedSearchFilter.email = searchByEmail; // If email keyword was provided, search by email
            }
            if (searchByName) {
                $scope.advancedSearchFilter.name = searchByName; // If name keyword was provided, search by name
            }
            app.searchLimit = undefined; // Clear limit on search results
        } else {
            app.searchLimit = undefined; // Clear limit on search results
            $scope.advancedSearchFilter = {};
        }
    };

    // Function: Set sort order of results
    app.sortOrder = function(order) {
        app.sort = order; // Assign sort order variable requested by user
    };
})

// // Controller: Used to edit users
// .controller('editDailyCostCtrl', function($scope, $routeParams, User, DailyCost, $timeout, $location, GLAccount, Config, Office) {

//     var app = this;
//     $scope.PrimaryInfoTab = 'active'; // Set the 'itemname' tab to the default active tab
//     app.phase1 = true; // Set the 'itemname' tab to default view

//     $scope.newPrimaryInfo = {};

//     $( document ).ready(function() {
//         $('.selectpicker').selectpicker('refresh');
//     });

//     function getDailyCost() {
//         DailyCost.getDailyCost($routeParams.id).then(function(data) {
//             // Check if the user's _id was found in database
//             if (data.data.success) {
//                 $scope.newPrimaryInfo.name = data.data.dailycosts.name;
//                 $scope.newPrimaryInfo.email = data.data.dailycosts.email;
//                 $scope.newPrimaryInfo.position = data.data.dailycosts.position;
//                 $scope.newPrimaryInfo.hourlycost = data.data.dailycosts.hourlycost;


//                 app.currentItem = data.data.dailycosts._id; // Get user's _id for update functions
//             } else {
//                 app.errorMsg = data.data.message; // Set error message
//             }
//         });        
//     }

//     getDailyCost();

//     app.PrimaryInfoPhase = function() {
//         $scope.PrimaryInfoTab = 'active'; // Set item name list to active
//         $scope.AdditionalInfoTab = 'default'; // Clear website tab
//         app.phase1 = true; // Set itemname tab active
//         app.phase2 = false; // Set website tab inactive
//         app.errorMsg = false; // Clear error message
//     };

//     app.AdditionalInfoPhase = function() {
//         $scope.PrimaryInfoTab = 'default'; // Set item name list to active
//         $scope.AdditionalInfoTab = 'active'; // Clear website tab
//         app.phase1 = false; // Set itemname tab active
//         app.phase2 = true; // Set website tab inactive
//         app.errorMsg = false; // Clear error message
//     };

//     app.updatePrimaryInfo = function(newPrimaryInfo, valid) {
//         app.errorMsg = false; // Clear any error messages
//         app.disabled = true; // Disable form while processing
//         // Check if the itemname being submitted is valid
//         if (valid) {
//             var dailycostsObject = {}; // Create a user object to pass to function
//             dailycostsObject._id = app.currentItem; // Get _id to search database
//             dailycostsObject.name = newPrimaryInfo.name;
//             dailycostsObject.email = newPrimaryInfo.email;
//             dailycostsObject.position = newPrimaryInfo.position;
//             dailycostsObject.hourlycost = newPrimaryInfo.hourlycost;

//             DailyCost.editDailyCost(dailycostsObject).then(function(data) {
//                 // Check if able to edit the user's name
//                 if (data.data.success) {
//                     app.successMsg = data.data.message; // Set success message
//                     // Function: After two seconds, clear and re-enable
//                     $timeout(function() {
//                         // $scope.PrimaryInfoForm.itemname.$setPristine();
//                         // $scope.PrimaryInfoForm.itemname.$setUntouched();
//                         // $scope.PrimaryInfoForm.incomeacct.$setPristine();
//                         // $scope.PrimaryInfoForm.incomeacct.$setUntouched();
//                         app.successMsg = false; // Clear success message
//                         app.disabled = false; // Enable form for editing
//                         $location.path('/managedailycostss');
//                     }, 2000);
//                 } else {
//                     app.errorMsg = data.data.message; // Clear any error messages
//                     app.disabled = false; // Enable form for editing
//                 }
//             });
//         } else {
//             app.errorMsg = 'Please ensure form is filled out properly'; // Set error message
//             app.disabled = false; // Enable form for editing
//         }
//     };

//     app.updateAdditionalInfo = function(newAdditionalInfo, valid) {
//         console.log('Additional Info Placeholder');
//     };

// });