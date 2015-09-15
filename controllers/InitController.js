var async = require('async');
var ArticleController = require('../controllers/ArticleController.js');
var CategoryController = require('../controllers/CategoryController.js');

exports.Init = function(req,res) {
	async.parallel({
		articles: function(callback,itemCount,pageCount){			
			ArticleController.list(req,function(req,articles,pageCount,itemCount) {
				callback(null,articles,pageCount,itemCount);
			})
		},
		categories: function(callback,itemCount,pageCount){
			CategoryController.list(req,function(req,categories) {				
				callback(null,categories,0,0);				
			})
		}
	},
// optional callback
	function(err, results){						
		res.render('index.jade', {
			articles: results.articles[0],
			categories: results.categories[0],
			user: req.user,
			pageCount: results.articles[1],
			itemCount: results.articles[2]			
         });
	});
};