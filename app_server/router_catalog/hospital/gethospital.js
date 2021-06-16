// 获取医院详情界面

// 链接数据库
const db = require('../../db/my_database');

module.exports = (req, res) => {
    // 获取请求参数
    const id = req.query.id;
    // res.send(id)

    // 定义数据库语言
    const sqlStr = 'select * from dc_hospital where iddc_hospital=?';

    // 操作数据库
    db.query(sqlStr, id, function (err, results) {
        // 数据库操作失败
        if (err) return res.cc(err.message);
        if (results.length !== 1) return res.cc('信息查询失败');

        // 响应信息
        res.send({
            status: 0,
            data: results[0],
            message: '获取用户信息成功！'
        })
    })
}