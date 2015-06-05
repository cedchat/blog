var Category = require('../models/CategoryModel.js');
var _this = this;

exports.list = function(req,res) {
	Category.find({},res);
}

exports.create = function(req, res){		
	new Category({name: req.param('category')}).save(function(error, result) {
		if (error) console.log(error)
		else _this.list(null,function(err,categories) {
				res.render('categories.jade',{categories:categories});
			});
		})
}

exports.delete = function(req, res){
	Category.remove({_id:req.params.id},function(error,result){
        res.redirect('/')
    });
}

exports.edit = function(req, res){
    Category.findById(req.params.id,function(error,result){
		res.render('category_edit.jade', {
            category: result,
			user: req.user
        });
    });
}

exports.save = function(req, res){
    console.log(req.param('name'));
	Category.findById(req.params.id,function(error,category){
	    category.name = req.param('name');
	    //category.facets = req.param('facets');
	    category.save();
        res.redirect('/')
    });
};   