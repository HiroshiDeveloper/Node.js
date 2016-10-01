var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mySqlConnection');

/* GET home page. */
router.get('/', function(req, res, next) {
	//res.render('index', { title: 'Database API' });
	var query = 'SELECT *, DATE_FORMAT(created_at, \'%Y / %m / %d : %k hrs %m mins %s secs\') AS created_at FROM boards';
	connection.query(query, function(err, rows){
		console.log(rows);
		res.render('index', {
			title: 'Database API',
			boardList: rows
		});
	});
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
