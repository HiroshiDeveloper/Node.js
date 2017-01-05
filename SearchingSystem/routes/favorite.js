var express = require('express');
var router = express.Router();

var ObjectID = require('mongodb').ObjectID;
var collection = require( '../../../mongoConnection' );
var COL = 'favorite';

router.get('/', function(req, res, next){
	collection(COL).find().toArray(function(err, data){
		res.render('favorite', {
			title: 'FAVORITE',
			jsondata: data
		});
	});
});

router.post('/', function(req, res, next){
	collection(COL).findOneAndDelete( { _id: new ObjectID( req.body.dataId ) 
});

	res.redirect('/favorite');
});


module.exports = router;

