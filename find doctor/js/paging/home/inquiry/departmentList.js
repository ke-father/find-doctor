$(function () {
    const layer = layui.layer;
    const form = layui.form;

    // 定义过滤器
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
            return '../../../uploads/neike.png'
        } else {
            return value
        }
    }

    // 发起ajax请求
    $.ajax({
        method: 'get',
        url: '/my/department/getlist',
        success: function (res) {
            if (res.status !== 0) return layer.msg(res.message);
            // console.log(res)

            // 将响应数据存储
            const obj = res.data;
            obj.forEach(function (value, item) {
                if (value.department_pic) {
                    value.department_pic = `http:\\\\localhost:8080${value.department_pic}`;
                }
            })
            // console.log(obj)

            // 获取渲染信息
            let art = template('department_list', obj);
            // console.log(art)
            // 将信息渲染到界面
            $('.department').html(art);

            // 使用layui重新渲染
            form.render();
        }
    })
})