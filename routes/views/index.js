var keystone = require('keystone'),
	Joke = keystone.list('Joke');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';


	// var randJoke = Joke.model.aggregate([{$sample: {size:1}}], function(err,result){
	// 	console.log(result);
	// 	locals.result = result
	// });
	var randJoke = Joke.model.aggregate([{$sample: {size:1}}],function(err,res){
		view.render('index', {result: res});
	});
	// var Jokes = Joke.model.find().exec(function(err,result) {
	// 	console.log(Object.keys(result).length);
	// 	locals.result = result;
	// });

	// view.render('index', {result: randJoke});
};
