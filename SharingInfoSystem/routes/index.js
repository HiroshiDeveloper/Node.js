var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../../../mySqlConnection');

/* GET home page. */
router.get('/', function(req, res, next) {
	
	var userId = req.session.user_id? req.session.user_id:0;
	if(!userId){
		res.redirect('/login');
	}
	
	var query = 'SELECT B.board_id, B.user_id, B.title, ifnull(U.user_name, \'None\') AS user_name, DATE_FORMAT(B.created_at, \'%Y/%m/%d , %k:%m:%s\') AS created_at FROM boards B LEFT OUTER JOIN users U ON B.user_id = U.user_id ORDER BY B.created_at DESC';
	
	connection.query(query, function(err, rows){
		console.log(rows);
		res.render('index', {
			title: 'Board',
			boardList: rows
		});
	});
});


router.post('/', function(req, res, next) {
	var title = req.body.title;
	var userId = req.session.user_id? req.session.user_id:0;

	// date
	var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
	
	// mysql query
	var query = 'INSERT INTO boards (user_id, title, created_at) VALUES ("' + userId + '", ' + '"' + title + '", ' + '"' + createdAt + '")';
	console.log(query);
	connection.query(query, function(err, rows){
		res.redirect('/');
	});
	
	console.log(title);
	console.log(createdAt);
});


module.exports = router;
