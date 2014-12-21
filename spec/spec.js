'use strict';

describe('GNP homepage', function() {
  var hg = element(by.model('hg'));
  var hn = element(by.model('hn'));
  var mg = element(by.model('mg'));
  var mn = element(by.model('mn'));
  var ag = element(by.model('ag'));
  var an = element(by.model('an'));

  var hw = element(by.model('hw'));
  var my = element(by.model('my'));
  var tr = element(by.model('tr'));

  function set(elt, val) {
    elt.clear().sendKeys(val);
    browser.waitForAngular();
  }

  function get(elt) {
    return elt.getAttribute('value');
  }

  beforeEach(function() {
    // browser.get('http://mycaule.github.io/gross-net-pay/');
    browser.get('http://0.0.0.0:8080');
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Calculate Net Pay from Gross Pay');
  });

  it('should have default parameters set', function() {
    expect(get(hw)).toEqual('35');
    expect(get(my)).toEqual('12');
    expect(get(tr)).toEqual('23');
  });

  it('should convert gross to net', function() {
    set(hg, 1000);
    expect(get(hn)).toEqual('770');

    set(mg, 1000);
    expect(get(mn)).toEqual('770');

    set(ag, 1000);
    expect(get(an)).toEqual('770');

    set(hn, 770);
    expect(get(hg)).toEqual('1000');

    set(mn, 770);
    expect(get(mg)).toEqual('1000');

    set(an, 770);
    expect(get(ag)).toEqual('1000');
  });

  it('should calculate partial values', function() {
    set(hg, 12);
    expect(get(mg)).toEqual('1820');
    expect(get(ag)).toEqual('21840');

    set(mg, 1820);
    expect(get(hg)).toEqual('12');
    expect(get(ag)).toEqual('21840');

    set(ag, 21840);
    expect(get(hg)).toEqual('12');
    expect(get(mg)).toEqual('1820');

    set(hn, 12);
    expect(get(mn)).toEqual('1820');
    expect(get(an)).toEqual('21840');

    set(mn, 1820);
    expect(get(hn)).toEqual('12');
    expect(get(an)).toEqual('21840');

    set(an, 21840);
    expect(get(hn)).toEqual('12');
    expect(get(mn)).toEqual('1820');
  });

  it('should update when params change', function() {
    set(hw, 40);
    set(hg, 12);
    expect(get(mg)).toEqual('2080');

    set(hn, 12);
    expect(get(mn)).toEqual('2080');

    set(ag, 40000);
    set(tr, 25);
    expect(get(an)).toEqual('30000');

    // set(my, 14);
    // set(hg, 14);
    // expect(get(mg)).toEqual('2080');

    // set(hn, 14);
    // expect(get(mn)).toEqual('2080');
  });
});
