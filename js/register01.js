$(() => {
    // 1、前端正则校验
    // 【1】、用户名
    $("#userName").blur(function () {
        /* 要求：2~6位字母(区分大小写) */
        let reg = /^[a-zA-Z]{2,6}$/
        let val = $.trim($(this).val())
        // console.log(val)
        if (reg.test(val)) {
            $(this).parent().next().css({ "display": "none" })
        } else {
            $(this).parent().next().css({ "display": "block" })
        }
    })
    // 【2】手机号码验证
    $("#userId").blur(function () {
        /* 要求：11位数字，以1开头，第二位是3-9之间的数字  13926291888 */
        let reg = /^1[3-9]\d{9}/
        let val = $.trim($(this).val())
        if (reg.test(val)) {
            $(this).parent().next().css({ "display": "none" })
        } else {
            $(this).parent().next().css({ "display": "block" })
        }
    })
    // 【3】密码验证
    $("#passwordA").blur(function () {
        /* 要求：3-12位字符，大小写字母和数字 */
        let reg = /^[a-zA-Z0-9]{3,12}$/
        let val = $.trim($(this).val())
        if (reg.test(val)) {
            $(this).parent().next().css({ "display": "none" })
        } else {
            $(this).parent().next().css({ "display": "block" })
        }

    })
    // 【4】密码再验证
    $("#passwordB").blur(function () {
        /* 要求：与第一次密码相同 */
        let valA = $.trim($("#passwordA").val())
        let val = $.trim($(this).val())
        if (valA === val) {
            $(this).parent().next().css({ "display": "none" })
        } else {
            $(this).parent().next().css({ "display": "block" })
        }

    })

    // 2、事件处理

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

    // 4、注册功能（网络请求）
})