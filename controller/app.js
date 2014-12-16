'use strict';
angular.module("demoAngular",['ui.router'])
	.config(function($stateProvider,$urlRouterProvider,$locationProvider){
		$urlRouterProvider.otherwise('/');
		$stateProvider
		.state('aaa',{
			url : '/step1Dash',
			templateUrl : 'views/step1.tpl.html',
			controller : 'step1'
		})
		.state('step2frm',{
			url : '/step2frm',
			templateUrl : 'views/step2.tpl.html',
			controller : 'step2'
		})
		.state('step3inf',{
			url : '/step3inf',
			templateUrl : 'views/step3.tpl.html',
			controller : 'step3'
		})
	})
	.factory('dataResponse',function($http){
		var factory = {};
		
		factory.getData = function(callback){$http.get('model/dashboard.json').success(callback)
			.error(function(){alert("Response not available");});
			
		}
		factory.globalObject = {};
		factory.globalObject.part1 = [];
		return factory;
		
	})
	.controller('step1', ['$state', '$scope','dataResponse','$location',
        function($state, $scope,dataResponse,$location){
        	//var url = 'model/dashboard.json';
        	//$scope.stepe1text="hello";
        	$scope.result = {};
        	dataResponse.getData(function(dataResult){
            	$scope.result = dataResult;
            	$scope.update = function(key,value){
 	           	     		
 	           		if(value.selected == true){
 	           			var newSelectedItems = {};
 	           			newSelectedItems.name = value.name;
 	           			newSelectedItems.company = value.company;
 	           			newSelectedItems.address = value.address;
 	           			newSelectedItems.about = value.about;
 	           			newSelectedItems.frinds = [];
 	           			newSelectedItems.frinds = value.friends;
 	           			dataResponse.globalObject.part1.push(newSelectedItems);

 	           		}
 	           	}
 	           	$scope.proceede = function(path){
 	           		$location.path(path);
 	           	}
            });
        }
    ])
    .controller('step2', ['$state', '$scope','dataResponse',
        function($state, $scope,dataResponse) {
            $scope.step2 = {};
            //console.log(dataResponse.globalObject.part1);
            $scope.step2=angular.copy(dataResponse.globalObject.part1);	
            
            console.log($scope.step2);
        }
    ])
    .controller('step3', ['$state', '$scope',
        function($state, $scope) {
            //alert("hello");
        }
    ]);