// 医生

// 引入express模块
const express = require('express');

// 创建路由
const doctor = express.Router();

// 引入multer模块  解析FormData数据
const multer = require('multer');
// 导入path 解决路径问题
const path = require('path');
// 创建multer实例
const upload = multer({dest: path.join(__dirname, '../../uploads')});

// 添加医生图片
doctor.post('/addpic', upload.single('doctor_pic'), require('../../router_catalog/doctor/addpic'));
// 获取医生列表功能
doctor.get('/getlist', require('../../router_catalog/doctor/getlist'));
// 获取医生详细信息
doctor.get('/getdetail', require('../../router_catalog/doctor/getdetail'));

// 开放
module.exports = doctor;