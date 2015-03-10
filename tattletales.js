var exec = require('child_process').exec;
var path = require('path');

module.exports = {
  init: function(callback) {
    var that = this;
    callback = callback || function (res) { console.log(res); };
    (function (fn) {
    	process.on('uncaughtException', function(err) {
    	  that.blame(err.stack, function (err, res) {
    	    if (err) return;
    	    fn(res);
        });
      });
    })(callback);
  },
  blame: function (stack, callback) {
    var stack = stack.split(/\n/),
  	 error = null,
  	 line = null,
  	 filename = null;
    
    if (stack.length < 2) callback(err);	

    error = stack[0];
	
    line = /\(.*\)$/.exec(stack[1]);
    line = line[0];
    line = line.substring(1, line.length-1);
    line = line.split(':');
    
    filename = line[0]; 
    exec('git blame ' + filename + ' --line-porcelain -L' + line[1] + ',+1', function (err, stdout, stderr) {
      if (err !== null) {
        return callback(err);
      }
      var response, 
          author,
          email;

	    response = stdout.split("\n");
      author = response[1].replace("author ", "");
      email = response[2].replace("author-mail", "").replace("<", "").replace(">", "").trim();

      callback(null, {
        blame: author, 
        email: email, 
        error: error, 
        filename: filename, 
        line: line[1], 
        stack: stack
      });
    });
  },
  primary_caretaker: function (file, callback) {
    exec("git blame --line-porcelain "  + file + " | sed -n 's/^author-mail //p' | sort | uniq -c | sort -rn", function (err, stdout, stderr) {
      if (err !== null) {
        return callback(err);
      }
      var response = stdout.replace(/(\r\n|\n|\r)/gm,"");
      console.log(response);
    });
  }
};