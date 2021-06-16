// 根据参数获取科室id

// 连接数据库
const db = require('../../db/my_database');

module.exports = (req, res) => {
    // console.log(req.query)
    // 定义数据库语言
    const sqlStr = 'select * from dc_desub where iddc_desub=?';

    // 操作数据库
    db.query(sqlStr, req.query.id, function (err, results) {
        // 数据库操作失败
        if (err) return res.cc(err.message);
        // if (results.length !== 1) return res.cc('信息获取失败！')

        res.send({
            status: 0,
            data: results[0],
            message: '获取信息成功！'
        })
    })
}