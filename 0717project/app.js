var express = require("express");
var app = express();
app.listen(3000);

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
    res.send('ok');
});

app.get("/map", function (req, res) {
    res.render('map.ejs', {});
})