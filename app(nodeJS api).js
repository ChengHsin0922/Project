var express = require("express");
var app = express();
app.listen(3000);

var bp = require("body-parser");
app.use(bp.urlencoded( {extended: true}));
app.use(bp.json());

app.get('/', function (req, res) {
    res.send('OK');
});

var mysql = require("mysql");
var conn = mysql.createConnection({
    user: "root",
    password: "",
    host: "localhost",    //也可以填127.0.0.1
    database: "northwind",
    port: 3306   //可寫可不寫，mysql預設就是3306
});

conn.connect(function (error) {
    if (!error) {
        console.log("連線成功");
        return;   //此行return斷開程式，下面console.log(error)就不會執行
    }
    console.log(error);
});

app.get('/products/list', function (req, res) {
    conn.query('select * from products',      //透過query()下達指令，從northwind，products表格，抓3筆資料
        [],
        function (error, result) {
            // res.send(JSON.stringify(result));   //也可以寫成下行
            res.json(result);
        }
    )
});

//抓產品id
app.get('/products/info/:id', function (req, res) {
    conn.query('select * from products where productId = ?',      //透過query()下達指令，從northwind，products表格，抓3筆資料
        [req.params.id],
        function (error, result) {
            // res.send(JSON.stringify(result));   //也可以寫成下行
            // res.send(result); 
            res.send(result[0]);  //不顯示陣列，改顯示單筆資料 
        }
    )
});

// /product/price/10/20
//抓特定價格範圍的資料
app.get('/products/price/:min/:max', function (req, res) {
    conn.query('select * from products where UnitPrice between ? and ?',      //透過query()下達指令，從northwind，products表格，抓3筆資料
        [req.params.min, req.params.max],
        function (error, result) {
            // res.send(JSON.stringify(result));   //也可以寫成下行
            res.json(result);
        }
    )
});

//抓庫存=0的商品
app.get('/products/stock/:number', function (req, res) {
    conn.query('select * from products where UnitsInStock = ?',      //透過query()下達指令，從northwind，products表格，抓3筆資料
        [req.params.number],
        function (error, result) {
            // res.send(JSON.stringify(result));   //也可以寫成下行
            res.json(result);
        }
    )
});

//新增資料到資料庫
app.post('/products/new', function (req, res) {
        conn.query(`INSERT INTO products 
            (ProductID, ProductName, Discontinued) 
            VALUES (?,?,?)`,
        [req.body.ProductID, req.body.ProductName, req.body.Discontinued],
        function (error, result) {
            res.json(JSON.stringify(result));
        }
    );
})

//刪除資料
app.delete('/products/delete', function (req, res) {
        conn.query('DELETE FROM products WHERE ProductID = ?',
        [req.body.ProductID],
        function (error, result) {
            res.json(JSON.stringify(result));
        }
    );
})

//更新產品
app.put('/products/update', function (req, res) {
        conn.query('UPDATE products SET UnitsInStock = ? WHERE ProductId = ?',
        [req.body.UnitsInStock ,req.body.ProductID],
        function (error, result) {
            res.json(JSON.stringify(result));
        }
    );
})