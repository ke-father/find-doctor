// 在ajax请求发出前拦截
$.ajaxPrefilter(function (options) {
    // 拼接请求地址
    options.url = 'http://localhost:8080' + options.url;

    // 配置请求头信息
    if (options.url.includes('/my/')) {
        options.headers = {
            // 取出本地储存的token
            Authorization: localStorage.getItem('Authorization')
        }
    }

    // // 为请求配置 未登录跳转登录页功能
    // options.complete = function (res) {
    //     if (res.responseJSON.status === 1 && res.responseJSON.message == '身份认证失败！') {
    //         // 清空本地token
    //         localStorage.removeItem('Authorization');
    //         // 退回到登录界面
    //         location.href = './login.html'
    //     }
    // }
})