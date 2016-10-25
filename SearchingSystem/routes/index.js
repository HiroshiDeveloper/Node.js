var express = require('express');
var router = express.Router();

var objectID = require('mongodb').ObjectID;
var collection = require( '../../../mongoConnection' );
var COL = 'favorite';

router.get('/', function(req, res, next) {
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
	collection(COL).insertOne(req.body);
});

module.exports = router;
