/// 医院路由

// 引入express模块
const express = require('express');

// 创建路由
const hospital = express.Router();

// 获取医院列表
hospital.get('/getlist', require('../../router_catalog/hospital/getlist'));
// 获取医院信息
hospital.get('/gethospital', require('../../router_catalog/hospital/gethospital'));
// 预约医院
hospital.post('/order', require('../../router_catalog/hospital/order'));
// 取消预约
hospital.get('/overorder', require('../../router_catalog/hospital/overorder'));

// 开放路由
module.exports = hospital;

