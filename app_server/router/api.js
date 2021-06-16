// 登陆路由 api
// 引入 express
const express = require('express');
// 创建路由
const api = express.Router();
// 引入验证模块
const { userLogin } = require('../schema/user');
// 引入依赖模块
const expressJoi = require('@escook/express-joi');

// 登陆功能
api.post('/login', require('../router_catalog/api/login'));
// 注册功能
api.post('/reg', require('../router_catalog/api/register'));

// 开放路由
module.exports = api;