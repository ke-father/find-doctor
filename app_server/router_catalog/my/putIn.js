// 提交用户信息更改

// 连接数据库
const db = require('../../db/my_database');

module.exports = (req, res) => {
    // 获取用户提交数据
    const userInfo = req.body;
    // console.log(typeof userInfo.data)
    const data = userInfo.data.split('&');
    // console.log(data);

    var obj = {};
    var arr = [];

    data.forEach(function (value,index) {
        arr = value.split('=');
        // console.log(arr[0], arr[1])
        obj[arr[0]] = arr[1];
    })

    obj.user_pic = userInfo.user_pic;
    obj.nickname = decodeURI(obj.nickname)

    console.log(obj)

    // 定义数据库语言
    const strSql = 'update dc_user set nickname=?,user_pic=? where iddc_user=?';

    // 操作数据库
    db.query(strSql, [obj.nickname, obj.user_pic, obj.iddc_user], function (err, results) {
        // 数据库操作失败
        if (err) return res.cc(err.message);
        // console.log(err.message)
        // 影响行数不为1 则表示失败
        // console.log(results)
        if (results.affectedRows !== 1) return res.cc('用户信息更新失败！');

        // 响应数据
        res.send({
            status: 0,
            message: '用户信息更新成功！'
        })
    })
}