var express = require("express");
var app = express();
app.listen(3000);

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
    res.send('ok');
});
// //市集地圖
app.get('/map', function(req, res) {
    conn.query(
        "SELECT * FROM vendor_info WHERE vinfo = ?",
        [vinfo],
        function(err, result) {
            console.log(result);
            res.render('map.ejs',{info: result});
        }
    )
})
//我要擺攤
app.get("/rentVendor", function (req, res) {
    res.render('rentVendor.ejs', {});
})


var mysql = require("mysql");
var conn = mysql.createConnection({
    user:'root',
    password:'',
    host:'localhost',
    database:'haoshin'
})

