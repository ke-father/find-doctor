$(function () {
    $('.arrows').on('click', function () {
        location.href = '../home.html'
    })

    $('[name=hospital]').on('focus', function () {
        location.href = 'order/findHospital.html';
    })
})