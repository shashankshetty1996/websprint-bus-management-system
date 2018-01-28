const mysql = require('mysql');

module.exports.getUsers = (callback) => {
    let sql = "SELECT * FROM users";
    global.con.query(sql, callback);
}

module.exports.getAuth = (username, password, callback) => {
    let sql = "SELECT * FROM users WHERE username = "+ mysql.escape(username) + " and password = "+ mysql.escape(password);
    global.con.query(sql, callback);
}