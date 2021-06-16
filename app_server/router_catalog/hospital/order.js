// 预约医院

// 连接数据库
const db = require('../../db/my_database');

module.exports = (req, res) => {
    // 获取用户参数
    const user = req.body;
    // console.log(user);
    // console.log(req.user)

    // 定义数据库语言
    const sqlStr = 'select * from dc_user where iddc_user=?';

    // 操作数据库
    db.query(sqlStr, req.user.iddc_user, function (err, results) {
        // 数据库操作失误
        if (err) return res.cc(err.message);
        // console.log(results)
        // 如果搜索结果不为1
        if (results.length !== 1) return res.cc('预约失败，请重试');

        // 如果预约不为空 表示已有预约
        if (!results[0].order_hospital && !results[0].order_doctor) {
            // 如果是预约医院
            if (user.order_hospital){
                // 定义数据库语句
                const updateSql = 'update dc_user set order_hospital=?,user_sex=?,order_date=?,user_place=? where iddc_user=?';

                // 操作数据库
                db.query(updateSql, [user.id, user.sex, user.date, user.user_place, req.user.iddc_user], function (err, results) {
                    // 数据库操作失败
                    if (err) return res.cc(err.message);
                    // 影响行数不为1
                    if (results.affectedRows !== 1) return res.cc('预约失败');

                    // 响应
                    res.send({
                        status: 0,
                        message: '预约成功'
                    })
                })
            }
            if (user.order_doctor) {
                console.log(2)
            }

        } else {
            return res.cc('已有预约，请勿重复预约！')
        }
    })

}