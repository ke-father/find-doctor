// 首页过渡页请求

// 引入数据库
const db = require('../../db/my_database');

module.exports = (req, res) => {
    // console.log(req.user)
    const userinfo = req.user;

    // flag 参数为空
    if (!req.query.flag) {
        return res.send({
            status: 0,
            data: userinfo,
            message: '数据获取成功！'
        })
    } else {
        // 定义数据库语句
        const sqlStr = 'update dc_user set flag=? where iddc_user=?';

        // 操作数据库
        db.query(sqlStr, [1, userinfo.iddc_user], function (err, results) {
            // 数据库操作失败
            if (err) return res.cc('数据库操作失败！');
            // 影响行数不为1
            if (results.affectedRows !== 1) return res.cc('更新失败！')

            // 响应更新成功
            res.cc('更新成功！', 0);
        })
    }
}