var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mySqlConnection');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Hello World' });
});


router.post('/', function(req, res, next) {
	var title = req.body.title;
	
	// date
	var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
	
	// mysql query
	var query = 'INSERT INTO boards (title, created_at) VALUES ("' + title + '", ' + '"' + createdAt + '")';
	console.log(query);
	connection.query(query, function(err, rows){
		res.redirect('/');
	});
	
	console.log(title);
	console.log(createdAt);
});


module.exports = router;
