$(function () {
    // 当点击登录时 展现登录面板  更换html背景色 与  图片
    $('.toLogin').on('click', function () {
           $('body').css({
            backgroundColor: '#f2f3f5',
            backgroundImage: 'none'
        })
        $('#bgd-img').attr('src', 'uploads/bg@2x.png').css('height', '57%')
        $('#top-img').attr('src', 'uploads/Component-Illustration 1@2x.png').parent().css('top', '40%')
        $('.title').css('display', 'none')
        $('.to').css('display', 'none');
        $('.login').css('display', 'block')
    })

    // 当点击注册时 同登陆
    $('.toReg').on('click', function () {
        $('body').css({
            backgroundColor: '#f2f3f5',
            backgroundImage: 'none'
        })
        $('#bgd-img').attr('src', 'uploads/bg@2x.png').css('height', '57%')
        $('#top-img').attr('src', 'uploads/Component-Illustration 1@2x.png').parent().css('top', '40%')
        $('.title').css('display', 'none')
        $('.to').css('display', 'none');
        $('.reg').css('display', 'block')
    })

    // 当点击注册时 显示注册面板 隐藏登录面板、
    $('#go_reg').on('click', function () {
        $('.login').css('display', 'none');
        $('.reg').css('display', 'block');
    })

    // 当点击去登录时 显示登录面板 隐藏注册面板、
    $('#go_login').on('click', function () {
        $('.reg').css('display', 'none');
        $('.login').css('display', 'block');
    })

    $('[type=password]').on('focus', function () {
        $(this).attr('placeholder', '');
        $(this).css('font-size', '40px')
    })

    $('[type=password]').on('blur', function () {
        if (!$(this).val) {
            if ($(this).attr('name') == 'password') {
                $(this).attr('placeholder', '请输入密码');
                $(this).css('font-size', '13px')
            } else {
                $(this).attr('placeholder', '请确认密码');
                $(this).css('font-size', '13px');
            }
        }
    })
})