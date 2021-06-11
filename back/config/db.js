const mysql = require('mysql');

const dbInfo = {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'vue_board'
}

let dbcon = {
    init:function() {
        return mysql.createConnection(dbInfo);
    },
    conn:function(con) {
        con.connect(function(err) {
            if (err) {
                console.log("mysql connection error: " + err);
            } else {
                console.log("mysql connection successfully");
            }
        })
    }
}

module.exports = dbcon;