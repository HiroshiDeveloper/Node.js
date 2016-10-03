var express = require('express');
var router = express.Router;
var connection = require('../../../mySqlConnection');

router.get('/', function(req, res, next){
	if(req.session.user_id){
		res.redirect('/');
	}else{
		res.render('login', {
			title : 'Log In'
		});
	}
});

router.post('/', function(req, res, next){
	var email = req.body.email;
	var password = req.body.password;
	var query = 'SELECT user_id FROM users WHERE email ="' + '"AND password = "' + password + '" LIMIT 1';
	connection.query(query, function(err, rows){
		var userId = rows.length? rows[0].user_id: false;
		if(userId){
			req.session.user_id = userId;
			req.redirect('/');
		}else{
			res.render('login', {
				title : 'login',
				noUser : 'Mail address and password dont match'
			});
		}
	});
});

modul.exports = router;
