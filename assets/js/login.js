$(function() {
    //点击去注册账号链接
    $('#link_reg').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        //点击去登录链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //从layui里获取form对象
    let form = layui.form

    let layer = layui.layer
        //通过form.verify()函数自定义校验规则

    //自定义一个pwd的密码校验规则
    form.verify({
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

            // 校验俩次密码是否一致

            repwd: function(value) {

                let pwd = $('.reg-box [name=password]').val()
                if (pwd != value) {
                    return '两次密码输入不一致'
                }
            }
        })
        //监听注册表单的提交事件
    $('#from_reg').on('submit', function(e) {
            //阻止默认的提交行为
            e.preventDefault()
                //发起ajax的post请求
            let data = {
                username: $('#from_reg [name=username]').val(),
                password: $('#from_reg [name=password]').val()
            }
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功')
                    //模拟成功的点击事件
                $('#link_login').click()
            })
        })
        //监听登录表单的提交事件
    $('#from_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            //快速获得表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                //将登录成功的token字符串保存在locationstoage中
                localStorage.setItem('token', res.token)

                //跳转至首页
                location.href = '/index.html'
            }
        })
    })
})