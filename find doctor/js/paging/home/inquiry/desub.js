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

    // 获取请求参数
    let url = location.search.substring(1);
    let arr = url.split('=');
    // console.log(arr)
    if (arr[0] == 'desub') {
        $('.href').attr('href', 'departmentList.html');
    } else {
        $('.href').attr('href', 'famous.html');
    }

    // 发起ajax请求
    $.ajax({
        method: 'get',
        url: '/my/department/getdesub',
        data: {
            id: arr[1]
        },
        success: function (res) {
            // 返回状态码不正确
            if (res.status !== 0) return layer.msg(res.message);

            // 获取渲染信息
            let art = template('department_list', res.data)
            // console.log(art)
            // 将信息渲染到页面
            $('.department').html(art);
        }
    })

})