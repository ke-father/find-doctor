// 获取医院列表功能

// 连接数据库
const db = require('../../db/my_database');

module.exports = (req, res) => {
    // 定义数据库语句
    const sqlStr = 'select * from dc_hospital';

    // 操作数据库
    db.query(sqlStr, function (err, results) {
        // 数据库操作失败
        if (err) return res.cc(err.message);

        res.send({
            status: 0,
            data: results,
            message: '列表获取成功！'
        })
    })
}