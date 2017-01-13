var express = require('express');
var router = express.Router();
var moment = require('moment');
var multer = require('multer');
var connection = require('../../../mySqlConnection');
var upload = multer({dest: './public/images/uploads'});

// socket io
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var POST = 8080;

// cloudinary
var data = require('../../../myCloudinary');
var cloudinary = require('cloudinary');
cloudinary.config(data);

// GET home page
router.get('/', function(req, res, next) {

	var userId = req.session.user_id? req.session.user_id:0;
	if(!userId){
		res.redirect('/login');
		return;
	}
	
	var query = 'SELECT B.image_path, B.board_id, B.user_id, B.title, ifnull(U.user_name, \'None\') AS user_name, DATE_FORMAT(B.created_at, \'%Y/%m/%d , %k:%m:%s\') AS created_at FROM boards B LEFT OUTER JOIN users U ON B.user_id = U.user_id ORDER BY B.created_at DESC';
	
	connection.query(query, function(err, rows){
		res.render('index', {
			title: 'Dash Board',
			boardList: rows
		});
	});

	http.listen(POST, function() {
		console.log('Start to connect..', POST);
	});
});

//connect socket.io
io.on('connection', function(socket) {
	console.log('ID : %s', socket.id);

        //show the id in a dashboard to everyone
	io.emit('message', socket.id + ' is here!', 'System');

        //message event
    	//show the id and message
   	socket.on('message', function(msj) {
       		io.emit('message', msj, socket.id);
     	});

	//if the system is disconnected
	socket.on('disconnect', function(e) {
		console.log('disconnected ID : %s', socket.id);
	});
});

router.post('/', upload.single('image_file'), function(req, res) {
	var path = req.file.path;
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
