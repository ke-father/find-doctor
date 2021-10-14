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
            return '../../../uploads/Component-Doctor No 4@2x.png'
        } else {
            return value
        }
    }

    // 获取url参数
    const query = location.search.substring(1);
    const arr = query.split('=');
    // console.log(arr)

   if (arr[0] == 'copy') {
       // 发起ajax请求  获取科室id
       $.ajax({
           method: 'get',
           url: '/my/department/getsum',
           data: {
               id: arr[1]
           },
           success: function (res) {
               if (res.status !== 0) return layer.msg(res.message);
               // console.log(res)
               // 为顶部角添加跳转功能
               $('.arrows').on('click', function () {
                   location.href = `copy_desub.html?famous=${res.data.be_department}`;
               })

               $('.title a').html(res.data.desub_name)
           }
       })
   } else {
       // 发起ajax请求  获取科室id
       $.ajax({
           method: 'get',
           url: '/my/department/getsum',
           data: {
               id: arr[1]
           },
           success: function (res) {
               if (res.status !== 0) return layer.msg(res.message);
               console.log(res)
               // 为顶部角添加跳转功能
               $('.arrows').on('click', function () {
                   location.href = `desub.html?desub=${res.data.be_department}`;
               })

               $('.title a').html(res.data.desub_name)
           }
       })
   }

    // 发起ajax请求
    $.ajax({
        method: 'get',
        url: '/my/doctor/getlist',
        success: function (res) {
            // 返回状态码不为0
            if (res.status !== 0) return res.cc(res.message);

            // 存储渲染信息
            const obj = res.data;

            // 为图片添加获取路径
            obj.forEach(function (value, item) {
                if (value.doctor_pic) {
                    value.doctor_pic = `http:\\\\localhost:8080${value.doctor_pic}`;
                    value.copy = arr[1]
                }
            })

            // console.log(obj)

            // 获取渲染信息
            let art = template('doctor_list', obj);
            // console.log(art)
            // 将信息渲染到页面
            $('.office_main').html(art);

            // 使用layui重新渲染界面
            form.render();
        }
    })
})