var Article = require('../models/ArticleModel.js');

exports.list = function(rep, res) {
	Article.find(function(error,docs){		
		res.render('index.jade', {            
            articles: docs,
			user: rep.user
        });
    });
}

exports.create = function(req, res){
	new Article({
		title: req.param('title'),
        body: req.param('body')
	}).save(function( error, docs) {
        res.redirect('/')
    });
}

exports.delete = function(req, res){
	Article.remove({_id:req.params.id},function( error, docs) {
        res.redirect('/')
    });
};