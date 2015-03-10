tattletales
=========

A library for blaming a user for a uncaught exception

## Installation

npm install tattletales --save

## Usage

```
var tattletale = require('tattletales');

tattletale.init(function (res) {
  console.log(res);
  // Exit gracefully
});

res =
  { 
    blame: <Name of user to blame>,
    email: <Email of user to blame>,
    error: <The error that caused the uncaught>,
    filename: <The filename of the file that caused the error>,
    line: <The line number of the error>,
    stack: <original stack trace>
  }


tattletale.primary_caretaker(file, function (err, res) {
  console.log(res);
});

res = [
  {user: <User with lines attributed to them>, count: <Count of lines this user atributed},
];
'''   

## Tests

npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.0.1 Initial release
* 0.0.2 Added email, beggining of designated caretakers of code
* 0.0.3 Added caretaker functionality

## Todo 

What happens if not git repo? 
Find a way to test a library that needs errors with chai
More verbose parsing
Do more then just uncaughts and blame (we can blame the world)`
