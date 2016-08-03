var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
* Joke Model
* ==========
*/

var Joke = new keystone.List('Joke');

Joke.add({
	createdAt: { type: Types.Datetime, default: Date.now, noedit: true, index: true },
	jokeType: { type: Types.Select, options: 'One-Liner, Q-and-A', initial: true, required: true },
	joke: {type: String, initial: true, required: true },
	jokeAnswer: {type: String, dependsOn: {jokeType: 'Q-and-A' }, initial: true },
});


Joke.defaultColumns = 'createdAt, jokeType, joke, jokeAnswer';
Joke.register();