var keystone = require('keystone'),
	Joke = keystone.list('Joke');

exports = module.exports = function (req, res) {
	var randJoke = Joke.model.aggregate([{$sample: {size:1}}],function(err,result){
		res.send(result);
	});
};
