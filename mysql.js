var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "cdnhung",
  password: "123123123",
  database: "cdnhung"
});

var conn = con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM employees WHERE id_nv ='15520125' ", function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});
module.exports = conn;