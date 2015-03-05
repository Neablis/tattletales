var gitblame = require('../tattletales');

gitblame.init(function(res) {
   console.log('The line that caused your error : \n' + res.blame + '\n');
   console.log('The error that caused the uncaught : \n' + res.error + '\n');
   console.log('The file that caused the error: \n' + res.filename + '\n');
   console.log('The line in the file that caused your error: \n' + res.line + '\n');
});


nonexistantfunction();
