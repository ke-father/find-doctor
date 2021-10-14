$(function () {
    const layer = layui.layer;
    const form = layui.form;
    const laydate = layui.laydate;

    form.verify({
        sex: function (value) {
            if (value !== '男' || value !== '女') {
                return '输入错误，请输入性别(男/女)'
            }
        }
    })

    $('.arrows').on('click', function () {
        location.href = '../home.html'
    })

    $('[name=order_hospital]').on('focus', function () {
        location.href = 'order/findHospital.html';
    })


    // 链接百度地图api 获取当前位置
    $.ajax({
        url: 'http://api.map.baidu.com/location/ip?ak=n6ZY5AHF5VIOkqFlc5rBrwGQlexlIKFX',
        dataType: 'JSONP',
        success: function (res) {
            // console.log(res)

            // console.log(res.content.address)
            $('#user_place').val(res.content.address);
        }
    })

    // 获取参数
    let query = window.location.search.substring(1)
    let arr = query.split('=');
    // console.log(arr)

    if (arr[0] == 'id') {
        $.ajax({
            method: 'get',
            url: 'http://localhost:8080/my/hospital/gethospital',
            headers: {
              Authorization: localStorage.getItem('Authorization')
            },
            data: {
                id: arr[1]
            },
            success: function (res) {
                // 返回状态码不正确
                if (res.status !== 0) return layer.msg(res.message);
                // console.log(res)

                // 将医院名称添加到页面
                $('[name=order_hospital]').val(res.data.hospital_name);
            }
        })
    }

    // 挂号表单
    $('.orderForm').submit(function (e) {
        // 阻止表单默认提交事件
        e.preventDefault();
        // 获取表单内容
        let data = $(this).serialize();
        // console.log(data)
        data = data + `&id=${arr[1]}`;

        // 发起ajax请求
        $.ajax({
            method: 'post',
            url: 'http://localhost:8080/my/hospital/order',
            headers: {
                Authorization: localStorage.getItem('Authorization')
            },
            data: data,
            success: function(res) {
                if (res.status !== 0) layer.msg(res.message, {
                    time: 1000
                }, function () {
                    location.reload();
                });

                layer.msg(res.message, {
                    time: 2000
                }, function () {
                    location.reload();
                });
            }
        })
    })

    // 获取用户信息
    $.ajax({
        method: 'get',
        url: 'http://localhost:8080/my/datum',
        headers: {
            Authorization: localStorage.getItem('Authorization')
        },
        success: function (res) {
            // 返回状态码不正确
            if (res.status !== 0) return layer.msg(res.message);
            // console.log(res)

            // 如果没有预约
            if (!res.data.order_hospital && !res.data.order_doctor) {
                $('.me_main a').on('click', function (e) {
                    // 阻止表单默认提交事件
                    e.preventDefault();
                    layer.msg('未进行任何预约！')
                })
            }
        }
    })
})