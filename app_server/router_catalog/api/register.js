// 注册功能

// 引入mysql数据库模块
const db = require('../../db/my_database');
// 引入bcryptjs加密模块
const bcryptjs = require('bcryptjs');

module.exports = (req, res) => {
    // 获取用户提交的数据
    const userInfo = req.body;

    // return res.send(userInfo);

    // 定义数据库语句
    const sqlStr = 'select * from dc_user where account=?';

    // 操作数据库
    db.query(sqlStr, userInfo.account, (err, results) => {
        // 数据库操作失败
        if (err) return res.cc(err.message);

        // console.log(results.length)

        // 如果查询结果不为空则表示账号已被占用
        if (results.length) return res.cc('账户名已被占用');

        // 定义插入的sql语句
        const sqlStr_into = 'insert into dc_user(account,password,user_love,user_collect,user_gold) values (?,?,?,?,?)';

        userInfo.password = bcryptjs.hashSync(userInfo.password, 10);
        userInfo.user_love = 0;
        userInfo.user_collect = 0;
        userInfo.user_gold = 0;

        // 操作数据库
        db.query(sqlStr_into, [userInfo.account, userInfo.password, userInfo.user_love, userInfo.user_collect, userInfo.user_gold], (err, results) => {
            // 数据库操作失败
            if (err) return res.cc(err.message);
            // 影响行数不为1 表示失败
            if (results.affectedRows !== 1) return res.cc('数据库操作失败');

            res.send({
                status: 0,
                message: '用户注册成功'
            })
        })
    })
}