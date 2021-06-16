// 获取科室详情页

// 链接数据库
const db = require('../../db/my_database');

module.exports = (req, res) => {
    // 定义数据库语言
    const sqlStr = 'select * from dc_desub where be_department=?';

    // 操作数据库
    db.query(sqlStr, req.query.id, function (err, results) {
        // 数据库操作失败
        if (err) return res.cc(err.message);
        // console.log(results)
        res.send({
            status: 0,
            data: results,
            message: '数据获取成功'
        })
    })
}