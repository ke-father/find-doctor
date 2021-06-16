// 获取医生详细信息

// 连接数据库
const db = require('../../db/my_database');

module.exports = (req, res) => {
    // 定义数据库语言
    const sqlStr = 'select * from dc_doctor where iddc_doctor=?'

    // 操作数据库
    db.query(sqlStr, req.query.id, function (err, results) {
        // 数据操作失败
        if (err) return res.cc(err.message);
        if (results.length !== 1) return res.cc('医生信息获取失败')

        res.send({
            status: 0,
            data: results[0],
            message: '信息获取成功！'
        })
    })
}
