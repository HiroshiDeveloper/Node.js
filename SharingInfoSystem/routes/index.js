var express = require('express');
var router = express.Router();
var moment = require('moment');
var multer = require('multer');
var connection = require('../../../mySqlConnection');
var upload = multer({dest: './public/images/uploads'});

var data = require('../../../myCloudinary');
var cloudinary = require('cloudinary');

cloudinary.config(data);

/* GET home page. */
router.get('/', function(req, res, next) {

	var userId = req.session.user_id? req.session.user_id:0;
	if(!userId){
		res.redirect('/login');
	}
	
	var query = 'SELECT B.image_path, B.board_id, B.user_id, B.title, ifnull(U.user_name, \'None\') AS user_name, DATE_FORMAT(B.created_at, \'%Y/%m/%d , %k:%m:%s\') AS created_at FROM boards B LEFT OUTER JOIN users U ON B.user_id = U.user_id ORDER BY B.created_at DESC';
	
	connection.query(query, function(err, rows){
		res.render('index', {
			title: 'Dash Board',
			boardList: rows
		});
	});
});


router.post('/', upload.single('image_file'), function(req, res) {
	var path;
	
	if(typeof req.file === 'undefined'){
		path = "public/images/uploads/74d459245f677c4b36b0cded6a6d5b97";
	}else{
		path = req.file.path;
	}

	var title = req.body.title;
	var userId = req.session.user_id? req.session.user_id:0;

	// date
	var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
	
	cloudinary.uploader.upload(path, function(result){
		var imagePath = result.url;
		
		// mysql query
		var query = 'INSERT INTO boards (image_path, user_id, title, created_at) VALUES ("' + imagePath + '", ' + '"' + userId + '", ' + '"' + title + '", ' + '"' + createdAt + '")';
		connection.query(query, function(err, rows){
			res.redirect('/');
		});
	});
});

router.delete('/', function(req, res, next){
	var boardId = req.body.boardId;
	var messagesDelete = 'DELETE FROM messages WHERE board_id=' + boardId;
	var boardsDelete = 'DELETE FROM boards WHERE board_id=' + boardId;

	connection.query(messagesDelete, function(err, messages){
		connection.query(boardsDelete, function(err, boards){
			res.end("DONE");
		});
	});
});


module.exports = router;
