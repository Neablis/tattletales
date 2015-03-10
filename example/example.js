var gitblame = require('../tattletales');

gitblame.init(function(err, res) {
	if (err) { return };
	gitblame.primary_caretaker(res.filename, function (err, res) {
		if (err) {return };
		if (res.length > 0) {
			console.log('This is probable the user you cant to harass about this file : \n' + res[0].user + '\n');
			console.log('This user made the most changes at : \n' + res[0].count + '\n');
		}
	});
	console.log('The person that caused your error : \n' + res.blame + '\n');
	console.log('The email address of that user : \n' + res.email + '\n');
	console.log('The error that caused the uncaught : \n' + res.error + '\n');
	console.log('The file that caused the error: \n' + res.filename + '\n');
	console.log('The line in the file that caused your error: \n' + res.line + '\n');
	console.log('The original stack that caused the error: \n');
	console.dir(res.stack);
	console.log('\n');
});


nonexistantfunction();