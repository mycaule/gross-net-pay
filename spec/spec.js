describe('GNP homepage', function() {
  var hgElt = element(by.model('hg'));
  var hnElt = element(by.model('hn'));
  var mgElt = element(by.model('mg'));
  var mnElt = element(by.model('mn'));
  var agElt = element(by.model('ag'));
  var anElt = element(by.model('an'));

  function set(elt, val) {
    elt.clear();
    elt.sendKeys(val);
  }

  beforeEach(function() {
    browser.get('http://mycaule.github.io/gross-net-pay/')
  });

  it('should have a title', function() {
    console.log(browser.getTitle())
    expect(browser.getTitle()).toEqual('Calculate Net Pay from Gross Pay');
  });

  // it('should convert Gross pay to Net pay', function() {
  //   set(hgElt, 1000);
  //   expect(hnElt.getText()).toEqual('770');
  // });
});
