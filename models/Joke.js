var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
* Joke Model
* ==========
*/

var Joke = new keystone.List('Joke');

Joke.add({
	jokeType: { type: Types.Select, options: 'One-Liner, QandA', initial: true, required: true },
	joke: {type: String, dependsOn: {jokeType: ['One-Liner']}, initial: true, required: true },
	jokeQuestion: {type: String, dependsOn: {jokeType: ['QandA']}, initial: true, required: true },
	jokeAnswer: {type: String, dependsOn: {jokeType: ['QandA']}, initial: true, required: true },
});


Joke.defaultColumns = 'joke type, joke';
Joke.register();