var exec = require('child_process').exec;
var path = require('path');

module.exports = {
  init: function(file, cb) {
     var that = this;
     process.on('uncaughtException', function(err) {
	that.blame(err.stack, function (err, res) {
	   if (err) return;
	   console.log(res);
  	   process.exit(1)
        });
     });
  },
  blame: function (stack, callback) {
     var stack = stack.split(/\n/),
	 error = stack[0],
	 line = /\(.*\)$/.exec(stack[1])[0],
	 filename = null;
	 
     line = line.substring(1, line.length-1);

     line = line.split(':');
    
     filename = line[0]; 
     exec('git blame ' + filename + ' -L' + line[1] + ',+1', function (error, stdout, stderr) {
     	if (error !== null) {
       	   console.log('exec error: ' + error);
       	   return callbackb(new Error(error));
      	}
      	callback(null, stdout);
     });
  }
};
