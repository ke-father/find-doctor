// 引入mysql
const mysql = require('mysql');

// 建立联系
const db = mysql.createPool({
    // 数据库ip地址
    host: '127.0.0.1',
    // 登陆数据库的账号
    user: 'root',
    password: 'admin123',
    // 链接的数据库
    database: 'doctor_database'
})

// // 检测mysql数据库是否正确工作
// db.query('select 1', (err, results) => {
//     if (err) return console.log(err.message);
//     console.log(results)
// })

module.exports = db;