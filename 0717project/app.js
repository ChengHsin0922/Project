var express = require("express");
var app = express();
var mysql = require("mysql");
var conn = mysql.createConnection({
    user:'root',
    password:'',
    host:'localhost',
    database:'haoshih'
})
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.get("/", function (req, res) {
    res.send('ok');
});
//渲染市集地圖頁面，預設抓vinfo=1的資料
app.get('/map', function(req, res) {
    const vinfo = req.query.vinfo; 
        conn.query(
            "SELECT * FROM vendor_info WHERE vinfo = ?",
            [vinfo || '1'],  
            function(err, result) {
                if(err) {
                    return res.status(500).send('Database query failed.');
                }
                res.render('map.ejs',{data_from_server: result});
            }
        )
})
//點擊更新資料
app.get('/data', function(req, res) {
    const vinfo = req.query.vinfo; 
        conn.query(
            "SELECT * FROM vendor_info WHERE vinfo = ?",
            [vinfo],  
            function(err, result) {
                if(err) {
                    return res.status(500).send('Database query failed.');
                }
                res.json({data_from_server: result});
            }
        )
}) 

//我要擺攤
app.get("/rentVendor", function (req, res) {
    res.render('rentVendor.ejs', {});
})


app.listen(4000);

