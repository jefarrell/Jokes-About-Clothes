var keystone = require('keystone'),
	Joke = keystone.list('Joke');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	var randJoke = Joke.model.aggregate([{$sample: {size:1}}],function(err,result){
		// view.render('index', {result: result});
		res.send(result);
		console.log(result);
	});

	console.log("hit refresh");
};
