$(function() {
    let form = layui.form

    let layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间'
            }
        }
    })

    initUserInfo()

    //初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res);

                //调用from.val() 快速为表单赋值
                form.val('formUserInfo', res.data)
            }

        })
    }

    //重置表单的数据
    $('#btnReset').on('click', function(e) {
        // 阻止表单的默认行为
        e.preventDefault()

        initUserInfo()
    })

    // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        // 阻止表单的默认行为
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('用户信息更新失败！')
                }

                layer.msg('用户信息更新成功！')

                // 调用父页面的方法，来重新渲染用户头像和用户信息
                window.parent.getUserInfo()
            }
        })
    })
})