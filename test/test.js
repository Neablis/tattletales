var assert = require('assert'),
    blame = require('../tattletales');

function throwNextTick(error) {
    process.nextTick(function () {
        // DO NOT MOVE FROM LINE 7
        undefinedFunction();
    })
}

describe("tattletales", function (next) {
    it("Throw a error and catch it", function (next) {
        //Removing and saving the default process handler
        var recordedError = null;
        var originalException = process.listeners('uncaughtException').pop();
        process.removeListener('uncaughtException', originalException);

        blame.init(function (err, res) {
          // Removing the process handler my blame added
          var newException = process.listeners('uncaughtException').pop();
          process.removeListener('uncaughtException', newException);

          // Putting back on mochas process handler
          process.listeners('uncaughtException').push(originalException);

          assert.equal(res.error, 'ReferenceError: undefinedFunction is not defined');
          assert.equal(res.line, 7);
          assert.equal(res.filename, '/Users/mitchelld3/tattletales/test/test.js');
          next();
        });
        throwNextTick();
    })
})
