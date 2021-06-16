 // 登陆功能

// 引入数据库模块
const db = require('../../db/my_database');
// 引入bcrypt对密码进行匹配
 const bcryptjs = require('bcryptjs');
// 引入JSONwebtoken模块创建Authorized字段
 const jwt = require('jsonwebtoken');
 // 引入secret密钥
const config = require('../../config');

module.exports = (req, res) => {
    const userinfo = req.body;

    // console.log(userinfo);

    // 定义sql语句
    const sqlStr = 'select * from dc_user where account=?';

    // 操作数据库
    db.query(sqlStr, userinfo.account, (err, results) => {
        // 如果数据库操作错误
        if (err) return res.cc(err.message);
        // 如果查询结果不为1 则表示用户未注册
        if (results.length !== 1) return  res.cc('该用户未注册！');

        // 匹配密码  查询密码是否正确
        const flag = bcryptjs.compareSync(userinfo.password, results[0].password);
        // 密码不匹配
        if (!flag) return res.cc('用户密码不正确');

        // 将用户的密码与头像剔除
        const user = {...results[0], password: '', user_pic: ''}

        // console.log(user)

        // 生成token
        const token = jwt.sign(user, config.secretKey, {expiresIn: config.expiresIn});

        // 响应看客户端 并将token响应
        res.send({
            status: 0,
            message: '登陆成功',
            token: `Bearer ${token}`
        })
    })
}