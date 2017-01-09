var express = require('express');
var router = express.Router();
var moment = require('moment');
var multer = require('multer');
var connection = require('../../../mySqlConnection');
var upload = multer({dest: './public/images/uploads'});
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var POST = 3000;

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

//socket.ioに接続された時に動く処理
io.on('connection', function(socket) {
	console.log("##################");
	//接続時に振られた一意のIDをコンソールに表示
    	console.log('入室したID : %s', socket.id);

      	//接続時に全員にIDを表示（messageというイベントでクライアント側とやりとりする）
        io.emit('message', socket.id + 'さんが入室しました！', 'System');

        //messageイベントで動く
    	//全員に取得したメッセージとIDを表示
   	socket.on('message', function(msj) {
		console.log("##PASS##");
       		io.emit('message', msj, socket.id);
     	});

         
	//接続が切れた時に動く
	//接続が切れたIDを全員に表示
	socket.on('disconnect', function(e) {
		console.log('接続が切れたID : %s', socket.id);
	});
});

/*
http.listen(POST, function() {
	  console.log('接続開始', POST);
})
*/

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
