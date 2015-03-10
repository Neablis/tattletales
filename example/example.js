var gitblame = require('../tattletales');

gitblame.init(function(res) {
   console.log('The person that caused your error : \n' + res.blame + '\n');
   console.log('The email address of that user : \n' + res.email + '\n');
   console.log('The error that caused the uncaught : \n' + res.error + '\n');
   console.log('The file that caused the error: \n' + res.filename + '\n');
   console.log('The line in the file that caused your error: \n' + res.line + '\n');
   console.log('The original stack that caused the error: \n');
   console.dir(res.stack);
});


nonexistantfunction();