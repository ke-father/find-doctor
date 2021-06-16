// 服务器文件
// 引入express
const express = require('express');
// 创建服务器
const app = express();

// 解析请求函数
app.use(express.urlencoded({extended: false}));

// 引入cors模块  解决跨域问题
const cors = require('cors');
// 配置全局cors
app.use(cors());

// 引入路由文件
// 登陆/注册
const api = require('./router/api');
// 首页
const my = require('./router/my');

// 开放静态资源
app.use('/uploads', express.static('./uploads'))

// 挂载自定义方法在res上
app.use((req, res, next) => {
    // 挂在自定义方法
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next();
})

// 引入express-jwt验证身份
const expressJwt = require('express-jwt');
// 引入密钥配置
const config = require('./config');
// console.log(config)
// 配置全局中间件 身份限制 /api开头的路由不需要身份定义
app.use(expressJwt({secret: config.secretKey, algorithms: ['HS256']}).unless({path: [/^\/api\//]}));

// 创建一级路由
// 登陆/注册
app.use('/api', api);
// 首页
app.use('/my', my);


// 引入joi模块
const joi = require('@hapi/joi');
// 定义错误处理中间件
app.use((err, req, res, next) => {
    // 判定错误是否因为错误验证
    if (err instanceof joi.ValidationError) return res.cc(err);
    // jwt 身份认证失败
    if (err.name === 'UnauthorizedError') return res.cc('无效的token， 请重新登陆');

    // 其他错误
    res.cc(err);
    console.log(err)
})

app.listen(8080);

console.log('服务器已打开');