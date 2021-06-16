// 取消预约功能

// 链接数据库
const db = require('../../db/my_database');

module.exports = (req, res) => {
    // 定义数据库语言
    const sqlStr = 'update dc_user set order_hospital=?,order_date=? where iddc_user=?';

    // 操作数据库
    db.query(sqlStr, [null, null, req.user.iddc_user], function (err, results) {
        // 如果数据操作失败
        if (err) return res.cc(err.message);
        // 影响行数不为1
        if (results.affectedRows !== 1) return res.cc('取消失败！ 请重试');

        res.send({
            status: 0,
            message: '取消成功！'
        })
    })
}