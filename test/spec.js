'use strict';

describe('calculator module', function() {

  var scope = {};
  var ctrl;

  beforeEach(module('calculator'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    ctrl = $controller('salaryController', {$scope: scope});
  }));

  describe('salary controller', function() {
    
    it('should be defined', function() {
      expect(ctrl).toBeDefined();
    });

    it('should have default parameters set', function() {
      expect(scope.mg).toEqual(2500);
      expect(scope.hw).toEqual(35);
      expect(scope.my).toEqual(12);
      expect(scope.tr).toEqual(23);

      expect(scope.wm).toEqual(52/12);
    });

    it('should convert gross to net', function() {
      scope.hg = 1000;
      scope.grossToNet('hour');
      expect(scope.hn).toEqual(770);

      scope.mg = 1000;
      scope.grossToNet('month');
      expect(scope.mn).toEqual(770);

      scope.ag = 1000;
      scope.grossToNet('year');
      expect(scope.an).toEqual(770);

      scope.hn = 770;
      scope.netToGross('hour');
      expect(scope.hg).toEqual(1000);

      scope.mn = 770;
      scope.netToGross('month');
      expect(scope.mg).toEqual(1000);

      scope.an = 770;
      scope.netToGross('year');
      expect(scope.ag).toEqual(1000);
    });

    it('should calculate partial values', function() {
      scope.hg = 12;
      scope.grossToNet('hour');
      expect(scope.mg).toEqual(1820);
      expect(scope.ag).toEqual(21840);

      scope.mg = 1820;
      scope.grossToNet('month');
      expect(scope.hg).toEqual(12);
      expect(scope.ag).toEqual(21840);

      scope.ag = 21840;
      scope.grossToNet('year');
      expect(scope.hg).toEqual(12);
      expect(scope.mg).toEqual(1820);

      scope.hn = 12;
      scope.netToGross('hour');
      expect(scope.mn).toEqual(1820);
      expect(scope.an).toEqual(21840);

      scope.mn = 1820;
      scope.netToGross('month');
      expect(scope.hn).toEqual(12);
      expect(scope.an).toEqual(21840);

      scope.an = 21840;
      scope.netToGross('year');
      expect(scope.hn).toEqual(12);
      expect(scope.mn).toEqual(1820);
    });

    it('should update when params change', function() {
      scope.hw = 40;
      scope.grossToNet('all');
      scope.hg = 12;
      scope.grossToNet('hour');
      expect(scope.mg).toEqual(2080);

      scope.hn = 12;
      scope.netToGross('hour');
      expect(scope.mn).toEqual(2080);

      scope.ag = 40000;
      scope.grossToNet('year');
      scope.tr = 25;
      scope.grossToNet('all');
      expect(scope.an).toEqual(30000);

      scope.my = 14;
      scope.grossToNet('all');
      scope.hg = 14;
      scope.grossToNet('hour');
      expect(scope.mg).toEqual(2080);

      scope.hn = 14;
      scope.netToGross('hour');
      expect(scope.mn).toEqual(2080);
    });

  });
});