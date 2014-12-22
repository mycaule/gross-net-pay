'use strict';

angular.module('calculator', []).
  controller('salaryController', salaryController);

function roundAll(obj) {
  obj.hg = Math.round(obj.hg);
  obj.hn = Math.round(obj.hn);
  obj.mg = Math.round(obj.mg);
  obj.mn = Math.round(obj.mn);
  obj.ag = Math.round(obj.ag);
  obj.an = Math.round(obj.an);
}

function evalGross(obj) {
  obj.hg = obj.hn/obj.k;
  obj.mg = obj.mn/obj.k;
  obj.ag = obj.an/obj.k;
}

function evalNet(obj) {
  obj.hn = obj.hg*obj.k;
  obj.mn = obj.mg*obj.k;
  obj.an = obj.ag*obj.k;
}

function getWM(NBmonths) {
  return 52/NBmonths;
}

function getGNFactor(rate) {
  return 1-rate/100;
}

function salaryController($scope) {
  // Default values
  $scope.mg = 2500;    // Gross Monthly Salary
  $scope.hw = 35;      // Number of hours worked by week
  $scope.tr = 23;      // Percentage Tax Rate
  $scope.my = 12;      // Number of months payed 
  
  // Computed values
  $scope.wm = getWM($scope.my);       // Average number of weeks/month
  $scope.k = getGNFactor($scope.tr);  // Gross to Net factor

  $scope.mn = $scope.mg*$scope.k;            // Net Monthly Salary
  $scope.ag = $scope.mg*$scope.my;           // Gross Annual Salary
  $scope.an = $scope.ag*$scope.k;            // Net Annual Salary
  $scope.hg = $scope.mg/$scope.wm/$scope.hw; // Gross Hourly Salary
  $scope.hn = $scope.hg*$scope.k;            // Gross Houryly Salary
  roundAll($scope);

  // TODO - Refactor
  $scope.grossToNet = function(type) {
    if (type === 'all') {
      $scope.wm = getWM($scope.my);
      $scope.k = getGNFactor($scope.tr);
    }

    if (type === 'hour') {
      $scope.mg = $scope.hg*$scope.hw*$scope.wm;
      $scope.ag = $scope.mg*$scope.my;

    } else if (type === 'month') {
      $scope.hg = $scope.mg/$scope.wm/$scope.hw;
      $scope.ag = $scope.mg*$scope.my;

    } else {
      $scope.mg = $scope.ag/$scope.my;
      $scope.hg = $scope.mg/$scope.wm/$scope.hw;
    } 

    evalNet($scope);
    roundAll($scope);
  };

  $scope.netToGross = function(type) {
    if (type === 'hour') {
      $scope.mn = $scope.hn*$scope.hw*$scope.wm;
      $scope.an = $scope.mn*$scope.my;

    } else if (type === 'month') {
      $scope.hn = $scope.mn/$scope.wm/$scope.hw;
      $scope.an = $scope.mn*$scope.my;

    } else {
      $scope.mn = $scope.an/$scope.my;
      $scope.hn = $scope.mn/$scope.wm/$scope.hw;
    }

    evalGross($scope);
    roundAll($scope);
  };
}