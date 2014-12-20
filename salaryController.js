
  function salaryController ($scope) {
    // Default values
    $scope.mg = 2500;    // Gross Monthly Salary
    $scope.hw = 35;      // Number of hours worked by week
    $scope.tr = 23;      // Percentage Tax Rate
    $scope.my = 12;      // Number of months payed 
    
    // Computed values
    $scope.wm = 52/12;           // Average number of weeks/month
    $scope.k = 1-$scope.tr/100;  // Gross to Net factor

    $scope.mn = Math.floor($scope.mg*$scope.k);            // Net Monthly Salary
    $scope.ag = Math.floor($scope.mg*$scope.my);           // Gross Annual Salary
    $scope.an = Math.floor($scope.ag*$scope.k);            // Net Annual Salary
    $scope.hg = Math.floor($scope.mg/$scope.wm/$scope.hw); // Gross Hourly Salary
    $scope.hn = Math.floor($scope.hg*$scope.k);            // Gross Houryly Salary

    // TODO - Refactor
    $scope.grossToNet = function (type) {
      if (type === 'hour') {
        $scope.hn = Math.floor($scope.hg*$scope.k); // Update Net
        $scope.mg = Math.floor($scope.hg*$scope.wm);
        $scope.mn = Math.floor($scope.mg*$scope.k);
        $scope.ag = Math.floor($scope.mg*$scope.my);
        $scope.an = Math.floor($scope.ag*$scope.k);

      } else if (type === 'month') {
        $scope.mn = Math.floor($scope.mg*$scope.k); // Update Net
        $scope.ag = Math.floor($scope.mg*$scope.my);
        $scope.an = Math.floor($scope.ag*$scope.k);
        $scope.hg = Math.floor($scope.mg/$scope.wm/$scope.hw);
        $scope.hn = Math.floor($scope.hg*$scope.k);

      } else if (type === 'year') {
        $scope.an = Math.floor($scope.ag*$scope.k); // Update Net
        $scope.mg = Math.floor($scope.ag/$scope.my);
        $scope.mn = Math.floor($scope.mg*$scope.k);
        $scope.hg = Math.floor($scope.mg/$scope.wm/$scope.hw);
        $scope.hn = Math.floor($scope.hg*$scope.k);

      } else {
        $scope.k = 1+$scope.tr/100;                 // Update Gross to Net Factor
        // Keep Annual Gross value, update others values
        $scope.mg = Math.floor($scope.ag/$scope.my);
        $scope.mn = Math.floor($scope.mg*$scope.k);
        $scope.an = Math.floor($scope.ag*$scope.k);
        $scope.hg = Math.floor($scope.mg/$scope.wm/$scope.hw);
        $scope.hn = Math.floor($scope.hg*$scope.k);

      }
    };

    $scope.netToGross = function (type) {
      if (type === 'hour') {
        $scope.hg = Math.floor($scope.hn/$scope.k); // Update Gross
        $scope.mg = Math.floor($scope.hg*$scope.wm);
        $scope.mn = Math.floor($scope.mg*$scope.k);
        $scope.ag = Math.floor($scope.mg*$scope.my);
        $scope.an = Math.floor($scope.ag*$scope.k);

      } else if (type === 'month') {
        $scope.mg = Math.floor($scope.mn/$scope.k); // Update Gross
        $scope.ag = Math.floor($scope.mg*$scope.my);
        $scope.an = Math.floor($scope.ag*$scope.k);
        $scope.hg = Math.floor($scope.mg/$scope.wm/$scope.hw);
        $scope.hn = Math.floor($scope.hg*$scope.k);

      } else if (type === 'year') {
        $scope.ag = Math.floor($scope.an/$scope.k); // Update Gross
        $scope.mg = Math.floor($scope.ag/$scope.my);
        $scope.mn = Math.floor($scope.mg*$scope.k);
        $scope.hg = Math.floor($scope.mg/$scope.wm/$scope.hw);
        $scope.hn = Math.floor($scope.hg*$scope.k);

      }
    };
  }