hould = require('chai').should(),
    blame  = require('../tattletales');

describe('#Blame', function() {
  it('Catches errors and return the user and line number', function() {
	blame.init(function (res) {
	   console.log('\n\n', res, '\n\n');
           escape('&').should.equal('&amp;');
        });
  	undefinedFunction();
  });
});
