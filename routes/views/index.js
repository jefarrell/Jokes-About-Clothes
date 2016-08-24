var keystone = require('keystone'),
	Joke = keystone.list('Joke');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	Joke.model.count(function(err,count) {
		console.log("count: " + count);
		view.render('index', { num : count });
	})
	
};
