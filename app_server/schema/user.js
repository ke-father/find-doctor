// 用户信息验证模块
// 引入@hapi/joi
const joi = require('@hapi/joi');

// 定义验证规则
// 账户
const account = joi.number().integer().min(6).max(12).required;
// 密码
const password = joi.string().pattern(/^[\S]{6,15}$/).required;
// 登陆
const userLogin = {
    body: {
        account,
        password
    }
}

// 开放
module.exports = {
    userLogin
}