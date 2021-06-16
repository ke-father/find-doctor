// 科室

// 引入express模块
const express = require('express');

// 创建路由
const department = express.Router();

// 引入multer模块  解析FormData数据
const multer = require('multer');
// 导入path 解决路径问题
const path = require('path');
// 创建multer实例
const upload = multer({dest: path.join(__dirname, '../../uploads')});

// 添加科室图标
department.post('/addpic', upload.single('department_pic'), require('../../router_catalog/department/addpic'));
// 获取科室信息
department.get('/getlist', require('../../router_catalog/department/getlist'));
// 获取科室细分
department.get('/getdesub', require('../../router_catalog/department/getdesub'));
// 根据参数获取科室id
department.get('/getsum', require('../../router_catalog/department/getsum'));

// 开放路由
module.exports = department;