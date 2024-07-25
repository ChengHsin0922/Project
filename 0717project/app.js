var express = require("express");
var app = express();
var mysql = require("mysql");
var conn = mysql.createConnection({
    user:'root',
    password:'',
    host:'localhost',
    database:'haoshin'
})

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
    res.send('ok');
});
// //市集地圖
app.get('/map', function(req, res) {
    const vinfo = req.query.vinfo; 
        conn.query(
            "SELECT * FROM vendor_info WHERE vinfo = ?",
            //vinfo 
            [vinfo || '1'],  
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


app.listen(3000);

