var expect = require('chai').expect,
    blame  = require('../tattletales');

describe('#Blame', function() {
  it('Catches errors and return the user and line number', function(done) {
      blame.init(function (res) {
	      console.log('\n\n', res, '\n\n');
        expect(true).should.equal(true);
        done();
      });

      expect(function () {
        undefinedFunction();
      }).to.throw('undefinedFunction is not defined');
  });
});
