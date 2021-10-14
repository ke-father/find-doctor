$(function () {
    const layer = layui.layer;

    // 链接
    $('.arrows').on('click', function () {
        location.href = "../order.html";
    })

    // 发起ajax请求
    $.ajax({
        method: 'get',
        url: '/my/datum',
        success: function (res) {
            // 如果数据库返回状态码不正确
            if (res.status !== 0) return  layer.msg(res.message);

            // console.log(res.data)
            // console.log(res.data.order_hospital)

            // 发起ajax请求获取医院名称
            $.ajax({
                method: 'get',
                url: '/my/hospital/gethospital',
                data: {
                    id: res.data.order_hospital
                },
                success: function (res) {
                    if (res.status !== 0) return  layer.msg(res.message);
                    // 将获取到的医院名称添加到对象上
                    $('.orderList h2').html(res.data.hospital_name)
                }
            })

            // 渲染用户信息
            let art = template('order_list', res.data);
            // 渲染信息到界面
            $('.orderList').html(art);
        }
    })
})