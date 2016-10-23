var express = require('express');
var router = express.Router();

var objectID = require('mongodb').ObjectID;
var collection = require( '../../../mongoConnection' );
var COL = 'favorite';

router.get('/', function(req, res, next){
	console.log("GO THROUGH FAVORITE PAGE");

	collection(COL).find().toArray(function(err, data){
    		console.log(data);
		
		//res.send(docs);
		
		res.render('favorite', {
			title: 'FAVORITE',
			jsondata: data
		});

	});

});


module.exports = router;

