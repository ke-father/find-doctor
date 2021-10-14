const layer = layui.layer;
const form = layui.form;

// 返回页
$('.arrows').on('click', function () {
    location.href = "../me.html";
})

const dataPic = {}
// 页面加载时执行
$.ajax({
    method: 'get',
    url: '/my/datum',
    success: function (res) {
        // 响应失败
        if (res.status !== 0) return layer.msg(res.message);

        dataPic.data = res.data.user_pic;
        // console.log(dataPic.data)
        // 使用layui方法 填充表单
        form.val('userForm', res.data);
    }
})

// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

// 选取上传文件
$('#uploading').on('click', function () {
    // 模拟文件选择框点击
    $('#avatar').click();
})

$('#avatar').on('change', function (e) {
    // console.log(e)
    // 获取文件
    var file = e.target.files[0]
    // 获取文件的url地址
    var newImgURL = URL.createObjectURL(file)

    $image
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', newImgURL)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域
})

const userData = {};

$('#sure').on('click', function () {
    const dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

    // console.log(dataURL)
    userData.user_pic = dataURL;
})

// 发起ajax请求
$('#user_form').submit(function (e) {
    // 阻止表单的默认提交事件
    e.preventDefault();

    // console.log(userData.user_pic)

    let data = $(this).serialize();
    console.log(data)

    if (userData.user_pic) {
        $.ajax({
            method: 'post',
            url: '/my/putin',
            data: {
                data,
                user_pic: userData.user_pic
            },
            success: function (res) {
                // 返回响应码不为0
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message, {
                    time: 1000
                }, function () {
                    $('.arrows').click();

                    $('#user_form')[0].reset();
                })
            }
        })
    } else {
        $.ajax({
            method: 'post',
            url: '/my/putin',
            data: {
                data,
                user_pic: dataPic.data
            },
            success: function (res) {
                // 返回响应码不为0
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message, {
                    time: 1000
                }, function () {
                    $('.arrows').click();

                    $('#user_form')[0].reset();
                })
            }
        })
    }
})