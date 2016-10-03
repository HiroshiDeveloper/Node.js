var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../../../mySqlConnection');

router.get('/:board_id', function(req, res, next){
	var boardId = req.params.board_id;
	var getBoardQuery = 'SELECT * FROM boards WHERE board_id = ' + boardId;
	var getMessageQuery = 'SELECT *, DATE_FORMAT(created_at, \'%Y / %m / %d : %k hrs %m mins %s secs\') AS created_at FROM messages WHERE board_id = ' + boardId;
	// var query = 'SELECT * FROM boards WHERE board_id = ' + boardId;
	
	/*
	connection.query(query, function(err, board){
		res.render('board', {
			title : board[0].title,
			board : board[0]
		});
	});
	*/

	connection.query(getBoardQuery, function(err, board){
		connection.query(getMessageQuery, function(err, messages){
			res.render('board', {
				title : board[0].title,
				board : board[0],
				messageList : messages
			});
		});
	});
});

router.post('/:board_id', function(req, res, next){
	var message = req.body.message;
	var boardId= req.params.board_id;
	var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
	var query = 'INSERT INTO messages (message, board_id, created_at ) VALUES("' + message + '", ' + '"' + boardId + '", ' + '"' + createdAt + '")';
	connection.query(query, function(err, rows){
		res.redirect('/boards/' + boardId);
	});
});

module.exports = router;
