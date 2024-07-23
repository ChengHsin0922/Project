var express = require("express");
var app = express();
app.listen(3000);

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
    res.send('ok');
});
//市集地圖
app.get("/map", function (req, res) {
    res.render('map.ejs', {});
})
//我要擺攤
app.get("/rentVendor", function (req, res) {
    res.render('rentVendor.ejs', {});
})