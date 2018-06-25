 angular.module('homeController', ['authServices'])

.controller('homeCtrl', function(Auth, $location, DailyCost) {

      var app = this;

      app.loggedIn = false;
      app.laborcosts = [];
      app.totalcosts = [];
      app.materialcosts = [];
      app.lableset = [];
      
      if(Auth.isLoggedIn())
      {
        app.loggedIn = true;

        // labelset = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

        DailyCost.getDailyCosts().then(function(data) {
            // Check if able to get data from database
            if (data.data.success) {
              if(data.data.dailycosts.length > 0) {
                console.log(data.data.dailycosts);
                for(var i=0; i<data.data.dailycosts.length; i++) {
                  app.lableset[i] = data.data.dailycosts[i].date;
                  app.totalcosts[i] = data.data.dailycosts[i].totalcost;
                  app.laborcosts[i] = data.data.dailycosts[i].laborcost;
                  app.materialcosts[i] = data.data.dailycosts[i].materialcost;
                }
              }
            } else {
                app.errorMsg = data.data.message; // Set error message
            }
        });


        // app.dataset = [100, 500, 420, 1000, 80];

        var ctx = document.getElementById("invoiceChart");
        var invoiceChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: app.lableset,
            datasets: [{
              label: 'Labor Costs',
              data: app.laborcosts,
              lineTension: 0,
              backgroundColor: 'transparent',
              borderColor: '#007bff',
              borderWidth: 4,
              pointBackgroundColor: '#007bff'
            }, 
            {
              label: 'Material Costs',
              data: app.materialcosts,
              lineTension: 0,
              backgroundColor: 'transparent',
              borderColor: '#997bff',
              borderWidth: 4,
              pointBackgroundColor: '#007bff'
            }, 
            {
              label: 'Total Costs',
              data: app.totalcosts,
              lineTension: 0,
              backgroundColor: 'transparent',
              borderColor: '#129b1f',
              borderWidth: 4,
              pointBackgroundColor: '#007bff'
            }]
          },
          options: {
            scales: {
              xAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }],
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }],

            },
            legend: {
              display: true,

            }
          }
        });

        // var ctx = document.getElementById("employeeChart");
        // var employeeChart = new Chart(ctx, {
        //   type: 'line',
        //   data: {
        //     labels: app.lableset,
        //     datasets: [{
        //       data: app.dataset,
        //       lineTension: 0,
        //       backgroundColor: 'transparent',
        //       borderColor: '#007bff',
        //       borderWidth: 4,
        //       pointBackgroundColor: '#007bff'
        //     }]
        //   },
        //   options: {
        //     scales: {
        //       xAxes: [{
        //         ticks: {
        //           beginAtZero: true
        //         }
        //       }],
        //       yAxes: [{
        //         ticks: {
        //           beginAtZero: true
        //         }
        //       }],

        //     },
        //     legend: {
        //       display: false,
        //     }
        //   }
        // });

      } else {
        app.loggedIn = false;
        $location.path('/about'); // Change route to clear user object
      }

      
});

//  angular.module('homeController', [])

// .controller('homeCtrl', function(Invoice, $scope) {
//     var app = this;

//     app.amounts = [];

//     function getInvoices() {
            
//         // Runs function to get all the offices from database
//         Invoice.getInvoices().then(function(data) {
//             // Check if able to get data from database
//             if (data.data.success) {
//                 // Check which permissions the logged in user has
//                 if (data.data.permission === 'admin' || data.data.permission === 'moderator' || data.data.permission === 'user') {
//                     app.invoices = data.data.invoices; // Assign offices from database to variable

//                     app.total = 0;
//                     angular.forEach(app.invoices, function(invoice) {
//                         app.total += parseFloat(invoice.amountremaining);
//                         app.amounts.push(invoice.amountremaining);
//                         // console.log(app.amounts);
//                     });
//                     app.loading = false; // Stop loading icon
//                     app.accessDenied = false; // Show table

//                     // Check if logged in user is an admin or moderator
//                     if (data.data.permission === 'admin') {
//                         app.editAccess = true; // Show edit button
//                         app.deleteAccess = true; // Show delete button
//                     } else if (data.data.permission === 'moderator') {
//                         app.editAccess = true; // Show edit button
//                     }
//                 } else {
//                     app.errorMsg = 'Insufficient Permissions'; // Reject edit and delete options
//                     app.loading = false; // Stop loading icon
//                 }
//             } else {
//                 app.errorMsg = data.data.message; // Set error message
//                 app.loading = false; // Stop loading icon
//             }
//         });
//     }


//     getInvoices(); // Invoke function to get offices from databases

//     var dataset = app.amounts;

//     var ctx = document.getElementById("invoiceChart");
//     var invoiceChart = new Chart(ctx, {
//       type: 'line',
//       data: {
//         labels: ["January", "February", "March", "April", "May", "June", "July"],
//         datasets: [{
//           data: dataset,
//           lineTension: 0,
//           backgroundColor: 'transparent',
//           borderColor: '#007bff',
//           borderWidth: 4,
//           pointBackgroundColor: '#007bff'
//         }]
//       },
//       options: {
//         scales: {
//           yAxes: [{
//             ticks: {
//               beginAtZero: true
//             }
//           }]
//         },
//         legend: {
//           display: false,
//         }
//       }
//     });


//   // var datasetValue = [];
//   // var count =10;
//   // for (var j = 0; j < count; j++) {    
//   // datasetValue[j] = 
//   //     {
//   //     fillColor: 'rgba(220,220,220,0.5)',
//   //     strokeColor :'rgba(220,220,220,1)',
//   //     title :'2013',
//   //     data : [Math.round(Math.random() * 100),Math.round(Math.random() * 100)-10]
//   //     }
//   // }
//   // var mydata = {
//   // datasets : datasetValue
//   // }
//   // alert("Datasets: "+mydata.datasets[0].data);
      




// });
