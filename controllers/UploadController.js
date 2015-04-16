var fs = require('fs');

exports.upload_file = function(req, res) {
	
	console.log(req.files);	
	html = "";
	html += "<script type='text/javascript'>";
	html += "    var funcNum = " + req.query.CKEditorFuncNum + ";";
	html += "    var url     = \"/files/" + req.files.upload.name + "\";";
	html += "    var message = \"Uploaded file successfully\";";
	html += "";
	html += "    window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
	html += "</script>";
	res.send(html);
	
}