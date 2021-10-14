$(function () {
    const layer = layui.layer;
    const form = layui.form;

    // 获取请求参数
    let url = location.search.substring(1);
        var arr = url.split('&');
        let query = {}
        arr.forEach(function (value, index) {
            let k = value.split('=');
            query[k[0]] = k[1]
        })
        // console.log(query)


    if (query.copy) {
        $('.arrow').attr('href', `copy_office.html?copy=${query.copy}`);
    } else if (query.famous) {
        $('.arrow').attr('href', 'famous.html');
    } else {
        $('.arrow').attr('href', 'departmentList.html');
    }

    function number() {
        if (query.famous) return query.famous;
        return query.list;
    }

    // 发起ajax请求
    $.ajax({
        method: 'get',
        url: '/my/doctor/getdetail',
        data: {
            id: number()
        },
        success: function (res) {
            // 如果响应状态码不为0
            if (res.status !== 0) return res.msg(res.message);

            // 存储信息
            const obj = res.data;
            // 为图片添加请求路径
            obj.doctor_pic = `http:\\\\localhost:8080${obj.doctor_pic}`;
            // console.log(obj)

            // 获取页面信息
            let art = template('doctor_detail', obj);
            let printArt = template('doctor_message', obj)
            // console.log(art)
            // 将信息渲染到页面
            $('.doctor_main').html(art)
            $('.onLine').html(printArt);

            // 重新渲染界面
            form.render();
        }
    })
})