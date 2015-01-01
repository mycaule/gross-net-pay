'use strict';

var lodash = angular.module('lodash', []);
lodash.factory('_', function() {
  return window._;
})

var app = angular.module('calculator', ['pascalprecht.translate', 'ngCookies', 'lodash']);

app.config(function($translateProvider) {
  $translateProvider
    .translations('en-US', {
      TITLE: 'Calculate net pay from gross pay',
      COUNTRY: 'Country: ',
      SALARY: 'Pay by',
      GROSS: 'Gross',
      NET: 'Net',
      HOURLY: 'hour',
      MONTHLY: 'month',
      ANNUALLY: 'year',
      PARAMETERS: 'Parameters',
      HOURS_PER_WEEK: 'hours per week',
      MONTHS_PER_YEAR: 'months per year',
      TAX_RATE: 'tax rate',
      EXPLANATIONS: 'Show explanations',
      VALUES_ROUNDED: 'Values above are rounded to the nearest integer.'
    })
    .translations('fr-FR', {
      TITLE: 'Calcul du salaire brut en net',
      COUNTRY: 'Pays : ',
      SALARY: 'Salaire',
      GROSS: 'Brut',
      NET: 'Net',
      HOURLY: 'horaire',
      MONTHLY: 'mensuel',
      ANNUALLY: 'annuel',
      PARAMETERS: 'Paramètres',
      HOURS_PER_WEEK: 'heures par semaine',
      MONTHS_PER_YEAR: 'mois par ans',
      TAX_RATE: 'charges salariales',
      EXPLANATIONS: 'Explications',
      VALUES_ROUNDED: 'Les valeurs ci-dessous sont arrondies à l\'entier le plus proche.'
    });

  $translateProvider.preferredLanguage('en-US');
});

app.controller('salaryController', salaryController);

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

function salaryController($translate, $cookies, $scope, _) {
  $scope.favCountry = $cookies.favCountry;

  // Default values
  $scope.mg = 2500;    // Gross Monthly Salary
  $scope.hw = 35;      // Number of hours worked by week
  $scope.tr = 23;      // Percentage Tax Rate
  $scope.my = 12;      // Number of months payed

  $scope.countries = [
    { label: 'USA', value: 'en-US'},
    { label: 'France', value: 'fr-FR'}
  ];
  var defCountry = _.find($scope.countries, {value: $cookies.favCountry});

  $scope.country = defCountry ? defCountry : $scope.countries[0];
  $translate.use($scope.country.value);
  
  $scope.withExplain = false;

  
  // Computed values
  $scope.wm = getWM($scope.my);       // Average number of weeks/month
  $scope.k = getGNFactor($scope.tr);  // Gross to Net factor

  $scope.mn = $scope.mg*$scope.k;            // Net Monthly Salary
  $scope.ag = $scope.mg*$scope.my;           // Gross Annual Salary
  $scope.an = $scope.ag*$scope.k;            // Net Annual Salary
  $scope.hg = $scope.mg/$scope.wm/$scope.hw; // Gross Hourly Salary
  $scope.hn = $scope.hg*$scope.k;            // Gross Houryly Salary

  roundAll($scope);

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

  $scope.toggleExplain = function() {
    $scope.withExplain = !$scope.withExplain;
  };

  $scope.setLang = function() {
    $cookies.favCountry = $scope.country.value;
    $translate.use($scope.country.value);
  };
}