$(function () {
    const layer = layui.layer;
    // 添加表单验证
    const form = layui.form;
    // 为表单添加自定义规则
    form.verify({
        // 账户 6-12位
        account: [
            /^[\S]{6,11}$/
            ,'账户必须是6到12位的数字，且不能出现空格'
        ],
        // 密码为6-12为不能出现空格
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ]
    })

    // 注册功能的ajax 提交
    $('.reg_form').submit(function (e) {
        // 阻止表单默认提交行为
        e.preventDefault();
        // console.log($('.reg_form').serialize());

        $.ajax({
            method: 'post',
            url: '/api/reg',
            // 获取注册表单的提交内容
            data: $('.reg_form').serialize(),
            success: function (res) {
                // 如果响应状态不为1 则表示注册失败
                if (res.status !== 0) return layer.msg(res.message, {
                    time: 1000
                }, function () {
                    // 清空表单内容
                    $('.reg_form')[0].reset();
                });
                layer.msg(res.message, {
                    icon: 1,
                    time: 1000
                }, function () {
                    // 点击去登录按钮
                    $('#go_login').click();
                    // 清空注册表单
                    $('.reg_form')[0].reset();
                })
            }
        })
    })

    // 登陆功能 ajax 提交
    $('.login_form').submit(function (e) {
        // 阻止表单默认提交行为
        e.preventDefault();
        // console.log($('.login_form').serialize())

        // 发起ajax请求
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $('.login_form').serialize(),
            success: function (res) {
                // console.log(res)
                // 返回状态值不为0
                if (res.status !== 0) return layer.msg(res.message, {
                    time: 1000
                }, function () {
                    // 清空表单内容
                    $('.login_form')[0].reset();
                });
                layer.msg(res.message, {
                    icon: 1,
                    time: 1000
                }, function () {
                    //跳转到首页
                    location.href = './index.html';
                    // 储存身份认证到本地
                    localStorage.setItem('Authorization', res.token);
                })
            }
        })
    })
})