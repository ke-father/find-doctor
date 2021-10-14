$(function () {
    const layer = layui.layer;
    const form = layui.form;

    // 过滤器
    // 换算百分比
    template.defaults.imports.evaluate = function(value) {
        // 换算百分比
        let num = (value / 1) * 100;
        let sum = `${num}%`;
        return sum;
    }
    // 过滤图片
    template.defaults.imports.pic = function(value) {
        // 换图片
        if (!value) {
            return '../../../uploads/Icons-24px-Back Copy 2@2x.png'
        } else {
            return value
        }
    }

    // 发起ajax请求 获取科室列表
    $.ajax({
        method: 'get',
        url: '/my/department/getlist',
        success: function (res) {
            // 响应状态码不为0
            if (res.status !== 0) return layer.msg(res.message);
            // console.log(res.data)

            // 存储第一个科室的信息
            let firstDepartment = res.data[0];

            // 储存前4个数据
            let first = [];
            for(let i = 0; i < 4; i++) {
                first.push(res.data[i])
            }

            // 添加图片请求路径
            first.forEach(function (value, itme) {
                if (value.department_pic) {
                    value.department_pic = `http:\\\\localhost:8080${value.department_pic}`
                }
            })

            // 储存后4个
            let last = [];
            for (let i = 4; i < 8; i++) {
                last.push(res.data[i]);
            }

            // 添加图片请求路径
            last.forEach(function (value, itme) {
                if (value.department_pic) {
                    value.department_pic = `http:\\\\localhost:8080${value.department_pic}`
                }
            })

            // 获取页面信息
            let echo = template('department_echo', firstDepartment);
            let firstArt = template('department_first', first);
            let lastArt = template('department_last', last);
            // console.log(firstArr)
            // 将信息添加到页面
            $('.family_top').html(echo);
            $('.first_icon').html(firstArt);
            $('.last_icon').html(lastArt);

            // 使用layui重新渲染界面
            form.render();
        }
    })

    // 发起ajax请求 获取医生列表
    $.ajax({
        method: 'get',
        url: '/my/doctor/getlist',
        success: function (res) {
            // 响应状态码不为0
            if (res.status !== 0) return layer.msg(res.message);

            // 存储响应信息
            let arr = res.data;
            // console.log(arr)

            // 添加图片请求路径
            arr.forEach(function (value, itme) {
                if (value.doctor_pic) {
                    value.doctor_pic = `http:\\\\localhost:8080${value.doctor_pic}`
                }
            })

            // 渲染页面信息
            let doctorArt = template('doctor_list', arr);
            // console.log(doctorArt)
            // 将信息添加到页面中
            $('.family_main ul').html(doctorArt);

            form.render();
        }
    })
})