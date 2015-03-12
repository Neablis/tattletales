var exec = require('child_process').exec;

module.exports = {
  init: function(callback) {
    var that = this;
    callback = callback || function (res) { console.log(res); };
    (function (fn) {
    	process.on('uncaughtException', function(err) {
    	  that.blame(err.stack, function (err, res) {
    	    if (err) return fn(err);
    	    fn(undefined, res);
        });
      });
    })(callback);
    return this;
  },
  blame: function (stack, callback) {
    var orig_stack = stack,
  	  error = null,
  	  line = null,
  	  filename = null;

    stack = stack.split(/\n/);

    if (stack.length < 2) return callback('Error parsing stack');

    error = stack[0];

    line = /\/.*/.exec(stack[1]);
    if (line[0].slice(-1) === ')') {
      line[0] = line[0].substring(0, line[0].length-1);
    }
    line = line[0];
    line = line.substring(0, line.length-1);
    line = line.split(':');

    filename = line[0];
    exec('git blame ' + filename + ' --line-porcelain -L' + line[1] + ',+1', function (err, stdout, stderr) {
      if (err !== null) return callback(err);

      var response,
          author,
          email,
          obj;

	    response = stdout.split("\n");
      author = response[1].replace("author ", "");
      email = response[2].replace("author-mail", "").replace("<", "").replace(">", "").trim();

      obj = {
        blame: author,
        email: email,
        error: error,
        filename: filename,
        line: line[1],
        stack: orig_stack
      };

      return callback(null, obj);
    });
    return this;
  },
  primary_caretaker: function (file, callback) {
    exec("git blame --line-porcelain "  + file + " | sed -n 's/^author-mail //p' | sort | uniq -c | sort -rn", function (err, stdout, stderr) {
      if (err !== null) {
        return callback(err);
      }

      var response = stdout.split("\n"),
          users = [],
          count = 0;

      for (;count < response.length; count++) {
        if (response[count] !== '') {
          var string = response[count].trim();
          string = string.split(" ");
          users.push({
            user: string[1],
            count: string[0]
          });
        }
      }

      return callback (null, users);
    });

    return this;
  }
};
