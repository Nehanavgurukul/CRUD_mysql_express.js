const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const app = express()
app.use(express.json())
const port = 5000

var Connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "Neha@1234",
    database : "EmployeeDB"
});


// Connection.connect((err,result) => {
//     if(err) throw err
//     console.log("Connection success")
//     var sql = "CREATE TABLE if not exists Employees (name VARCHAR(255), address VARCHAR(255))";
//     Connection.query(sql,(err,result) => {
//         if(err) throw err
//         console.log("create table ")
//     })
// })


app.post("/postdata",(req,res) => {
    Connection.connect((err) => {
        if(err) throw err
        console.log("connected.")
        var sql = "INSERT INTO Employees (name, address) VALUES ('Neha', 'Gwalior')";
        Connection.query(sql, function(err,result){
            if(err) throw err;
            res.send(result)
            console.log("data inserted")
        })
    })
})


app.get("/getdata",(req, res) => {
    Connection.connect((err) => {
        if(err){
            console.log(err)
        }
        console.log("connected")
        var sql = "select * from Employees";
        Connection.query(sql,function(err,result,field){
        console.log(result)
        res.send(result)
        });
    });
});


app.put("/updatedata",(req,res) => {
    Connection.connect(function(err){
        if(err) throw err;
        console.log('connected.');
        var sql = "update Employees set name = 'Shikhaaa' where name = 'Neha'";
        Connection.query(sql,(err,result) => {
            console.log("updated..")
            res.send(result)
        });
    });
});


app.delete("/deletedata",function(req,res){
    Connection.connect(function(err){
        console.log("connected..")
        var sql = "DELETE FROM Employees WHERE name = 'Shikhaaa'";
        Connection.connect(sql,function (err,result){
            console.log("deleted..")
            res.send("delete...")
        });
    });
});

app.listen(port,(req,res) => {
    console.log(`server is running on ${port}`)
});

