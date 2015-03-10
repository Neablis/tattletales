tattletales
=========

A library for blaming a user for a uncaught exception

## Installation

  npm install tattletales --save

## Usage

  var tattletale = require('tattletales'),
      tattletale.init(function (res) {
	console.log(res);
	// Please i beg of you, system.exit here, die with honor
      });

  res - 
     { 
	blame: <Line of code to blame for error with user and function>,
  	error: <The error that caused the uncaught>,
	filename: <The filename of the file that caused the error>,
  	line: <The line number of the error>
      }
         

## Tests

  npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.0.1 Initial release

## Todo 

What happens if not git repo? 
Find a way to test a library that needs errors with chai
More verbose parsing
Do more then just uncaughts and blame (we can blame the world)`
