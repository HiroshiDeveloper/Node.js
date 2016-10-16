var express = require('express');
var router = express.Router();

var objectID = require('mongodb').ObjectID;
// MongoDB用ファイルを指定
var collection = require( '../../../mongoConnection' );
var COL = 'users';


router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
	collection(COL).insertOne(req.body).then(function(r) {
	   	console.log("PASS");
		res.send("name=name1");
	});
});

module.exports = router;
