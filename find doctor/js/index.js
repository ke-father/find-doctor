$(function () {
    const layer = layui.layer;

    $('.lead_btn').on('click', function () {
        $('.lead').css('display', 'none');
    })

    // 获取过渡页控制阀
    $.ajax({
        method: 'get',
        url: '/my/lead',
        success: function (res) {
            // console.log(res)
            // 数据状态码不为0
            if (res.status !== 0) return layer.msg('数据获取失败！请登录');

            let data = res.data;
            // console.log(data.flag)

            // 判断过渡页flag
            if (data.flag == 0) {
                // 当flag为0 表示用户为第一次进入
                // 将过渡页设置为显示
                $('.lead').css('top', '0');

                // 点击按钮之后
                $('.lead_btn').on('click', function (e) {
                    // 将过渡页设置为隐藏
                    $('.lead').css('top', '-100%');
                    // 并且发起ajax 请求
                    $.ajax({
                        type: 'get',
                        url: '/my/lead',
                        data: {
                            flag: 1
                        },
                        success: function (res) {
                            console.log(res)
                        }
                    })
                })
            } else {
                $('.lead').css('top', '-100%')
            }
        }
    })
})