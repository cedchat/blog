var Article = require('../models/ArticleModel.js');
var CategoryController = require('../controllers/CategoryController.js');
var _this = this;

exports.list = function(req,res) {
	Article.find({},null, {sort: '-date'},res);	
}

exports.listbycategory = function(req,res) {
	CategoryController.list(null,function(err,cats) {
		Article.find({categories: req.params.category},null, {sort: '-date'},function(err,articles) {
			res.render('index.jade',{
				articles: articles,
				categories : cats,
				user: req.user
			});
		});
	});
}

exports.create = function(req, res){
	console.log(req.param('category_list'));
	new Article({
		author: req.user.username,
		title: req.param('title'),
        body: req.param('body'),
		categories : req.param('category_list')
	}).save(function( error, docs) {
        res.redirect('/')
    });
}

exports.delete = function(req, res){
	backURL=req.header('Referer');	
	Article.remove({_id:req.params.id},function(error,docs){
        res.redirect(backURL);
    });
}

exports.edit = function(req, res){
    CategoryController.list(null,function(err,categories) {
		Article.findById(req.params.id,function(error,docs){				
				res.render('blog_edit.jade', {
				article: docs,
				categories : categories,
				user: req.user
				});
        });
    });
}

exports.save = function(req, res){
	Article.findById(req.params.id,function(error,article){
	    article.title = req.param('title');
	    article.body = req.param('body');
		article.categories = req.param('category_list');
	    article.save();
        res.redirect('/');
    });
};