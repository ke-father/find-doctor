// 用户充值功能

// 连接数据库
const db = require('../../db/my_database');

module.exports = (req, res) => {
    // 获取充值金额
    let user = req.body;
    user.iddc_user = req.user.iddc_user;
    console.log(user)

    // 定义数据库语句
    const sqlStr = 'select * from dc_user where iddc_user=?';

    // 操作数据库
    db.query(sqlStr, user.iddc_user, function (err, results) {
        // 数据库操作失败
        if (err) return res.cc(err.message);
        // 如果查询结果不为1
        if (results.length !== 1) return res.cc('充值失败！');
        // console.log(results)

        // 获取用信息
        let userInfo = results[0];
        // console.log(userInfo)

        // 得到新的金币数量
        let gold_number = parseInt(user.user_gold) + parseInt(userInfo.user_gold);
        // console.log(gold_number)

        let member = null;
        // 更改用户vip等级
        if (gold_number < 50 || gold_number == 0) {
            member = null;
        } else if (gold_number >= 50 && gold_number < 200) {
            member = 1;
        } else if (gold_number >= 200 && gold_number < 400) {
            member = 2;
        } else if (gold_number >= 400) {
            member = 3;
        } else {
            member = null;
        }
        // console.log(member)

        // 定义更新数据库的语句
        const Update = 'update dc_user set member=?,user_gold=? where iddc_user=?';

        // 操作数据库语句
        db.query(Update, [member, gold_number, req.user.iddc_user], function (err, results) {
            // 数据库操作失败
            if (err) return res.cc(err.message);
            // 影响行数不为1
            if (results.affectedRows !== 1) return res.cc('充值失败！');
            res.send({
                status: 0,
                message: '充值成功！'
            })
        })
    })
}