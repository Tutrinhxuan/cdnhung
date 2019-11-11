//Khởi tạo server chạy cổng 8000
var http = require('http');
var fs= require('fs');
var formidable = require('formidable');
var path = require('path');
var mysql = require('mysql');
var conn_data = require('./mysql.js')
//var express = require('express');

// var pg = require('pg');
// var conn = mysql.createConnection({
//   database: 'cdnhung',
//   host: "localhost",
//   user: "cdnhung",
//   password: "123123123"
// });
// var pool = new pg.Pool(config);

var server = http.createServer(function (req, res) {
	// Kiểm tra nếu như url truyền lên là /upload và phương thức là post
	if(req.url =='/upload' && req.method.toLowerCase() == 'post')
	{
		// Khởi tạo biến form bằng IncomingForm để phân tích một tập tin tải lên, chứa các thông tin submit từ form
		var form = new formidable.IncomingForm();
		// Cấu hình thư mục sẽ chứa file trên server với hàm .uploadDir
		form.uploadDir = 'uploads/';
		// Xử lý upload file với hàm .parse
		form.parse(req, function(err,fields, file) //file là file ng dùng up lên, fields chứa parameter của file
		{
			var tmpPath = file.files.path; //là đường dẫn của file sau khi được upload lên server (mặc định nó sẽ lưu vào thư mục đệm/temp)
			var newPath = form.uploadDir + file.files.name;
			fs.rename(tmpPath, newPath, function(err)   //di chuyển file được upload từ thư mục temp sang vị trí muốn lưu.
			{
				if(err) throw err;
				res.end('Upload thanh cong!. ');
			});
		});
		 return ;
	}
	else
	{
		res.writeHead(200,{'Content-Type': 'text/html'});
		fs.readFile('index.html', 'utf8', function(err, data)
		{
			if(err) throw err;
			res.end(data);
		});
	}
		
});

// server.get('/d', function(req, res)
// 	{
// 		pool.connect(function(err, client, done)
// 			{
// 				if(err)
// 				{
// 					throw err;
// 				}
// 				client.query("SELECT * FROM employees", function (err, result) 
// 				{
// 	    			if (err) throw err;
// 	   			 	console.log(result);
// 	  			});
// 			});
// 	});

// conn.connect(function(err) {
//   if (err) throw err;
//   con.query("SELECT * FROM employees WHERE id_nv ='15520125' ", function (err, result) {
//     if (err) throw err;
//     console.log(result);
//   });
// });

server.listen(8000);