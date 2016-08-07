var keystone = require('keystone'),
	Joke = keystone.list('Joke');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	var randJoke = Joke.model.aggregate([{$sample: {size:1}}],function(err,res){
		view.render('index', {result: res});
	});
	// var Jokes = Joke.model.find().exec(function(err,result) {
	// 	console.log(Object.keys(result).length);
	// 	locals.result = result;
	// });

	// view.render('index', {result: randJoke});
};
