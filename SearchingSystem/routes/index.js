var express = require('express');
var router = express.Router();

var objectID = require('mongodb').ObjectID;
var collection = require( '../../../mongoConnection' );
var COL = 'favorite';

router.get('/', function(req, res, next) {
	console.log("GETGET");
	res.render('index', {
	       	title: 'Searching System',
		dropdown: {
			//Amusement
			aquarium: 'aquarium',
			bar: 'bar',
			movie_theater: 'movie_theater',

			//Food
			restaurant: 'restaurant',
			cafe: 'cafe',
			bakery: 'bakery',
			
			//Facility
			atm: 'atm',
			post_office: 'post_office',
			hospital: 'hospital',
			police: 'police',

			//Transportation
			station: 'station',
			airport: 'airport',
			subway_station: 'subway_station'
		}
	});
});

router.post('/', function(req, res, next){
	console.log("POSTPOST");
	console.log(req.body.name);
	console.log(req.body.address);
	console.log(req.body.icon);
	console.log(req.body.rating);
	console.log(req.body.photo);
	collection(COL).insertOne(req.body);
});

module.exports = router;
