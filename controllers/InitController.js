var async = require('async');
var ArticleController = require('../controllers/ArticleController.js');
var CategoryController = require('../controllers/CategoryController.js');

exports.Init = function(req,res) {
	async.parallel({
		articles: function(callback){			
			ArticleController.list(req,function(req,articles) {
				callback(null,articles);				
			})
		},
		categories: function(callback){			
			CategoryController.list(req,function(req,categories) {				
				callback(null,categories);				
			})
		}
	},
// optional callback
	function(err, results){		
		 res.render('index.jade', {
			articles: results.articles,
			categories: results.categories,
			user: req.user
         });
	});
};