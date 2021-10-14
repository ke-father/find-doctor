$(function () {
    const layer = layui.layer;
    const form = layui.form;

    // 获取url参数
    var query = window.location.search.substring(1);

    let arr  = query.split('=');
    // console.log(arr[1])

    // 发起ajax请求

    $.ajax({
        method: 'get',
        url: '/my/hospital/gethospital',
        data: {
            id: arr[1]
        },
        success: function (res) {
            // 返回状态码不为0
            if(res.status !== 0) return layer.msg(res.message);

            // 渲染信息
            let art = template('hospital_name', res);
            let place = template('place', res.data);
            let evaluate = template('hospital_evaluate', res.data);
            // 将信息渲染到页面中
            $('.hospital_name').html(art);
            $('.place').html(place)
            $('.intro_main').html(evaluate);

            // 渲染界面
            form.render();
        }
    })


    $('.more').on('click', function (e) {
        e.stopPropagation();
        $('.hospital_intro p').css('overflow', 'visible');
        $('.more').css('display', 'none');
        $('.short').css('display', 'block')
    })

    $('.short').on('click',function (e) {
        e.stopPropagation();
        $('.hospital_intro p').css('overflow', 'hidden');
        $('.short').css('display', 'none');
        $('.more').css('display', 'block')
    })


    // 当点击预约按钮
    $('#order_btn').on('click', function () {
        location.href = `../order.html?id=${arr[1]}`
    })
})