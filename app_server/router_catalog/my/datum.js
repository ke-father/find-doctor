// 获取用户个人资料

// 链接数据库
const db = require('../../db/my_database');

module.exports = (req, res) => {
    // 存储用户数据
    const userInfo = req.user;

    // 定义数据库语言
    const sqlStr = 'select * from dc_user where iddc_user=?';

    // 操作数据库
    db.query(sqlStr, userInfo.iddc_user, function (err, results) {
        // 数据库操作失误
        if (err) return res.cc(err.message);
        // res.cc(results)

        // 将密码与头像剔除
        const user = {...results[0], password: ''}
        // console.log(user)

        // 将用户信息返回
        res.send({
            status: 0,
            data: user,
            message: '用户信息获取成功！'
        })
    })
}