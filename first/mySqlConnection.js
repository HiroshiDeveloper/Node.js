var mysql = require('mysql');

// mysql config
/*
var dbConfig = {
	host:'mysql108.phy.lolipop.lan',
	user:'LAA0786421',
	password:'danielpowter',
	database:'LAA0786421-hiroshi'
};
*/
var dbConfig = {
	host:'localhost',
	user:'root',
	password:'danielpowter',
	database:'hiroshi'
}

var connection = mysql.createConnection(dbConfig);

module.exports = connection;
