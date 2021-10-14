// 我的
$(function () {
    const layer = layui.layer;
    const form = layui.form;

    getuserInfo();

    function getuserInfo() {
        // 获取用户信息
        $.ajax({
            method: 'get',
            url: '/my/datum',
            success: function (res) {
                // 请求失败
                if (res.status !== 0) return layer.msg('获取用户信息失败！');

                // console.log(res.data.order_doctor)
                const order_hospital = res.data.order_hospital;
                const order_doctor = res.data.order_doctor;
                // console.log(order_hospital, order_doctor)

                const orderObj = res.data
                // console.log(orderObj)

                // console.log(res)
                // 渲染信息
                let art = template('userInfo', res);
                let loveArt = template('userLove', res);
                // console.log(art)
                // 将art插入页面内
                $('.message_left').html(art);
                $('.account').html(loveArt);

                // 获取用户的vip信息
                const vip = res.data.member;
                // console.log(vip)
                // 储存vip信息
                const vipData = new Object();

                switch (vip) {
                    case null || 0:
                        vipData.vipGrade = '普通会员';
                        break;
                    case 1:
                        vipData.vipGrade = '青铜会员';
                        break;
                    case 2:
                        vipData.vipGrade = '白银会员';
                        // console.log(111)
                        break;
                    case 3:
                        vipData.vipGrade = '黄金会员';
                        break;
                    default:
                        break;
                }
                // console.log(vip, vipData.vipGrade)
                // 渲染vip信息
                let vipArt = template('vipInfo', vipData);
                // console.log(vipArt);
                // 插入页面中
                $('.vip').html(vipArt);

                // 如果有预约
                if (order_doctor || order_hospital) {

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
                            orderObj.hospital = res.data.hospital_name;

                            $('.order_name h3').html(res.data.hospital_name)
                        }
                    })

                    // console.log(orderObj.hospital)
                    // 渲染信息
                    let orderArt = template('order_date', orderObj);
                    // console.log(orderArt);
                    // 将信息渲染到页面
                    $('.health').html(orderArt);
                } else {
                    let newArt = template('new', orderObj);
                    $('.health').html(newArt)
                }

                // 利用layui重新渲染
                form.render();

                // $('#user_pic').attr('src', res.data.user_pic)
            }
        })
    }

    // 点击取消预约
    $('.health').on('click', $('#over_order'),function () {
        layer.confirm('是否取消预约?（恶意预约会受到封号惩罚）', {icon: 3, title:'提示'}, function(index){
            // 发起ajax请求
            $.ajax({
                method: 'get',
                url: '/my/hospital/overorder',
                success: function (res) {
                    if (res.status !== 0) return layer.msg(res.message);
                    layer.msg(res.message, {
                        time: 2000
                    }, function () {
                        // 调用模块获取用户信息  渲染界面
                        location.reload();

                        // 关闭弹出成
                        layer.close(index);
                    });
                }
            })
        });
    })
})