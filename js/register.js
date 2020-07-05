$(() => {

    // 3、图形验证码
    let imgCode;
    /*不传值，统一走默认值*/
    let captcha = new Captcha({
        lineWidth: 1, //线条宽度
        lineNum: 4, //线条数量
        // dotR: 200, //点的半径
        // dotNum: 1000, //点的数量
        preGroundColor: [10, 80], //前景色区间
        backGroundColor: [150, 250], //背景色区间
        fontSize: 40, //字体大小
        fontFamily: ['Georgia', '微软雅黑', 'Helvetica', 'Arial'], //字体类型
        fontStyle: 'stroke', //字体绘制方法，有fill和stroke
        content: '0123456789', //验证码内容
        length: 4 //验证码长度
    });

    captcha.draw(document.querySelector('#captcha'), r => {
        console.log('验证码', r);
        imgCode = r;

        /* 自动触发标签的事件 */
        $("#imageCode").trigger("blur");
    });


    // 1、前端正则校验
    let options = {
        // 【1】、用户名
        "userName": {
            reg: `/^[\u4e00-\u9fa5_a-zA-Z0-9]{2,10}$/.test(val)`
        },
        // 【2】手机号码验证
        "userId": {
            reg: `/^1[3-9]\\d{9}/.test(val)`
        },
        // 【3】密码验证
        "passwordA": {
            reg: `/^[a-zA-Z0-9]{3,12}$/.test(val)`
        },
        // 【4】密码再验证
        "passwordB": {
            reg: `$.trim($("#passwordA").val()) === val`
        },
        // 【5】验证码验证
        "imageCode": {
            reg: `val == imgCode`
        }
    }
    // 2、事件处理
    $(".main-form input").blur(function () {
        let option_id = this.id
        // console.log("option_id", options[option_id])
        let val = $.trim($(this).val())
        if (eval(options[option_id].reg)) {
            $(this).parent().parent().children("i").css({ "display": "none" })
            $(this).parent().parent().children("i").removeClass("form-group-error")
        } else {
            $(this).parent().parent().children("i").css({ "display": "block" })
            $(this).parent().parent().children("i").addClass("form-group-error");
        }
    })

    // 4、注册功能（网络请求）
    $("#goBtn").click(function () {
        /* [1] 检查表单验证是否全部都通过，如果有一个没有通过那么就return  */
        $("#userName,#userId,#passwordA,#passwordB,#imageCode").trigger("blur")


        if ($(".form-group-error").length != 0) {
            console.log("错了")
            alert("信息输入有误！")
            return;
        } else {
            // console.log("ok")
            /* [2] 发送网络请求去执行注册 */
            let data = {
                username: $.trim($("#userName").val()),
                userid: $.trim($("#userId").val()),
                password: md5($.trim($("#passwordA").val())).slice(0, 15)  //加密处理
            }
            console.log(data)
            // 发送ajax
            $.ajax({
                url: "../server/register.php",
                type: "post",
                data,
                dataType: "json"
            }).done(data => {
                console.log(data)
                if (data.status == "success") {
                    alert("恭喜您，注册成功！")
                    location.href = "../src/login.html"
                } else {
                    alert(data.msg)
                }
            })
        }


    })
})