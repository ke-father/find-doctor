$(function () {
    const layer = layui.layer;

    $('.arrows').on('click', function () {
        location.href = "../me.html";
    })

    // 将点击的盒子 添加类
    $('.money').on('click', function () {
        $('.money').removeClass('money_on');
        $(this).addClass('money_on')
    })

    // 当点击提交按钮时 提交请求
    $('.putin').on('click', function (e) {
        // 阻止表单默认提交行为
        e.preventDefault();

        // 获取充值额度
        let number = $('.money_on i').html();
        // console.log(number)

        $.ajax({
            method: 'post',
            url: '/my/recharge',
            data: {
                user_gold: number
            },
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message);
                // console.log(res)
                layer.msg('充值成功', {
                    time: 1000
                })
            }
        })
    })
})