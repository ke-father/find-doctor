$(function () {
    const layer = layui.layer;
    const form = layui.form;

    // // 定义过滤器
    // template.defaults.imports.ranking = function(value) {
    //     if (value.length >= 16) return '';
    //     return value
    // }

    $('.arrows').on('click', function () {
        location.href = "../order.html";
    })

    $.ajax({
        method: 'get',
        url: '/my/hospital/getlist',
        success: function (res) {
            // 返回状态不为0
            if (res.status !== 0) return layer.msg('获取医院信息失败！');

            // 渲染信息
            let art = template('hospital_list', res)
            // 将信息添加到页面中
            $('.find').html(art);

            // 使用layui重新渲染界面
            form.render();
        }
    })
})