var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "eduipca"
});

connection.connect(function (err) {
    if(err){
        console.log('Error de conexion ' + err.stack);
    } else {
        console.log('Conectado con el identificador ' + connection.threadId);
    }
});

connection.end();

