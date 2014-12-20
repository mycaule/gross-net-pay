function formatSalary(number) {
  return Math.floor(number);
}

function salaryController ($scope) {
  // Default values
  $scope.mg = 2500;    // Gross Monthly Salary
  $scope.hw = 35;      // Number of hours worked by week
  $scope.tr = 23;      // Percentage Tax Rate
  $scope.my = 12;      // Number of months payed 
  
  // Computed values
  $scope.wm = 52/12;           // Average number of weeks/month
  $scope.k = 1-$scope.tr/100;  // Gross to Net factor

  $scope.mn = formatSalary($scope.mg*$scope.k);            // Net Monthly Salary
  $scope.ag = formatSalary($scope.mg*$scope.my);           // Gross Annual Salary
  $scope.an = formatSalary($scope.ag*$scope.k);            // Net Annual Salary
  $scope.hg = formatSalary($scope.mg/$scope.wm/$scope.hw); // Gross Hourly Salary
  $scope.hn = formatSalary($scope.hg*$scope.k);            // Gross Houryly Salary

  // TODO - Refactor
  $scope.grossToNet = function (type) {
    if (type === 'hour') {
      $scope.hn = formatSalary($scope.hg*$scope.k); // Update Net
      $scope.mg = formatSalary($scope.hg*$scope.wm);
      $scope.mn = formatSalary($scope.mg*$scope.k);
      $scope.ag = formatSalary($scope.mg*$scope.my);
      $scope.an = formatSalary($scope.ag*$scope.k);

    } else if (type === 'month') {
      $scope.mn = formatSalary($scope.mg*$scope.k); // Update Net
      $scope.ag = formatSalary($scope.mg*$scope.my);
      $scope.an = formatSalary($scope.ag*$scope.k);
      $scope.hg = formatSalary($scope.mg/$scope.wm/$scope.hw);
      $scope.hn = formatSalary($scope.hg*$scope.k);

    } else if (type === 'year') {
      $scope.an = formatSalary($scope.ag*$scope.k); // Update Net
      $scope.mg = formatSalary($scope.ag/$scope.my);
      $scope.mn = formatSalary($scope.mg*$scope.k);
      $scope.hg = formatSalary($scope.mg/$scope.wm/$scope.hw);
      $scope.hn = formatSalary($scope.hg*$scope.k);

    } else {
      $scope.k = 1+$scope.tr/100;                 // Update Gross to Net Factor
      // Keep Annual Gross value, update others values
      $scope.mg = formatSalary($scope.ag/$scope.my);
      $scope.mn = formatSalary($scope.mg*$scope.k);
      $scope.an = formatSalary($scope.ag*$scope.k);
      $scope.hg = formatSalary($scope.mg/$scope.wm/$scope.hw);
      $scope.hn = formatSalary($scope.hg*$scope.k);

    }
  };

  $scope.netToGross = function (type) {
    if (type === 'hour') {
      $scope.hg = formatSalary($scope.hn/$scope.k); // Update Gross
      $scope.mg = formatSalary($scope.hg*$scope.wm);
      $scope.mn = formatSalary($scope.mg*$scope.k);
      $scope.ag = formatSalary($scope.mg*$scope.my);
      $scope.an = formatSalary($scope.ag*$scope.k);

    } else if (type === 'month') {
      $scope.mg = formatSalary($scope.mn/$scope.k); // Update Gross
      $scope.ag = formatSalary($scope.mg*$scope.my);
      $scope.an = formatSalary($scope.ag*$scope.k);
      $scope.hg = formatSalary($scope.mg/$scope.wm/$scope.hw);
      $scope.hn = formatSalary($scope.hg*$scope.k);

    } else if (type === 'year') {
      $scope.ag = formatSalary($scope.an/$scope.k); // Update Gross
      $scope.mg = formatSalary($scope.ag/$scope.my);
      $scope.mn = formatSalary($scope.mg*$scope.k);
      $scope.hg = formatSalary($scope.mg/$scope.wm/$scope.hw);
      $scope.hn = formatSalary($scope.hg*$scope.k);

    }
  };
}