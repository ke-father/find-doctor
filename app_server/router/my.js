// 主页my

// 引入express模块
const express = require('express');

// 创建路由
const my = express.Router();

// 进入首页后的引导页
my.get('/lead', require('../router_catalog/my/lead'));
// 获取用户资料
my.get('/datum', require('../router_catalog/my/datum'));
// 提交修改
my.post('/putin', require('../router_catalog/my/putIn'));
// 充值
my.post('/recharge', require('../router_catalog/my/recharge'));

// 当请求医院信息时
my.use('/hospital', require('./my/hospital'));
// 科室
my.use('/department', require('./my/department'));
// 当请求医生信息时
my.use('/doctor', require('./my/doctor'));

// 开放路由
module.exports = my;


