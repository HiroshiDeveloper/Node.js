var express = require('express');
var router = express.Router();

var objectID = require('mongodb').ObjectID;
var collection = require( '../../../mongoConnection' );
var COL = 'favorite';

router.get('/favorite', function(req, res, next){
	console.log("GO THROUGH FAVORITE PAGE");
	res.render('index', {
		title: 'FAVORITE'
	});
});
