// 获取医生列表功能

// 链接数据库
const db = require('../../db/my_database');

// 开放
module.exports = (req, res) => {
    // 定义数据库语言
    const sqlStr = 'select * from dc_doctor';

    // 操作数据库
    db.query(sqlStr, function (err, results) {
        // 数据库操作失误
        if (err) return res.cc(err.message);
        // console.log(results)

        res.send({
            status: 0,
            data: results,
            message: '获取信息成功！'
        })
    })
}