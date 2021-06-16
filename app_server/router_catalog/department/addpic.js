// 添加科室图标

// 引入数据库
const db = require('../../db/my_database');
// 引入path模块
const path = require('path');

module.exports = (req, res) => {
    // 验证是否传入图片进入
    if (!req.file || req.file.fieldname !== 'department_pic') return res.cc('请传入图标');

    // 整合参数
    const addPic = {
        // 展开req.body
        ...req.body,
        // 图标
        department_pic: path.join('/uploads', req.file.filename)
    }

    // 定义数据库语言
    const sqlStr = 'update dc_department set department_pic=? where iddc_department=?';

    // 操作数据库
    db.query(sqlStr, [addPic.department_pic, addPic.iddc_department], function (err, results) {
        // 数据库操作失败
        if (err) return res.cc(err.message);
        // 影响行数不为1
        if (results.affectedRows !== 1) return res.cc('数据添加失败');

        res.send({
            status: 0,
            message: '数据添加成功'
        })

    })
}