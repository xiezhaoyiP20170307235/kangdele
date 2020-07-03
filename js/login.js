// 点击对应的登录方式显示对应的登录格式
$(".form-tab li").click(function () {
    $(this).children("i").removeClass("show-color")
    $(this).siblings().children("i").addClass("show-color")
    let idx = $(this).index()
    // console.log(idx)
    // console.log($(".con-l"))
    if (idx == 0) {
        $(".con-disblock").removeClass("con-n")
        $(".con-disnone").addClass("con-n")
    } else {
        $(".con-disblock").addClass("con-n")
        $(".con-disnone").removeClass("con-n")
    }
})

// 前端验证
// 1、手机号码的前端验证
function isUserID() {
    // 1、判断非空
    if ($("#userId").val() == "") {
        return false
    }
    // 2、格式判断
    let reg = /^1\d{10}$/
    if (!reg.test($("#userId").val())) {
        return false
    }
    return true
}
// 2、密码的前端验证
function isPass() {
    // 1、判断非空
    if ($("#password").val() == "") {
        return false
    }
    return true
}
// 3、所有前端验证
function isTrue() {
    if (isUserID() == false) {
        $("#userId").parent().css({ "border-color": "#ff5c4b" })
        $("#userId").siblings("label").css({ "display": "block" })
    } else if (isPass() == false) {
        $("#password").parent().css({ "border-color": "#ff5c4b" })
        $("#password").siblings("label").css({ "display": "block" })
    } else {
        return isUserID() && isPass()
    }

}

$(()=>{
     // /1、前端验证
    // 手机号码
    $("#userId").blur(function () {
        console.log("@@@")
        if (isUserID() == false) {
            $(this).parent().css({ "border-color": "#ff5c4b" })
            $(this).siblings("label").css({ "display": "block" })
            return
        } else {
            $(this).parent().css({ "border-color": "#ddd" })
            $(this).siblings("label").css({ "display": "none" })
        }
    })
    // 密码
    $("#password").blur(function () {
        if (isPass() == false) {
            $(this).parent().css({ "border-color": "#ff5c4b" })
            $(this).siblings("label").css({ "display": "block" })
            return
        } else {
            $(this).parent().css({ "border-color": "#ddd" })
            $(this).siblings("label").css({ "display": "none" })
        }
    })
    // 登录按钮
    $("#goBtn").click(function(){
        console.log("!!!")
        // 前端正则验证
        isTrue() 
        
        let userid = $.trim($("#userId").val())
        let password = md5($.trim($("#password").val())).slice(0, 15)
        console.log(userid,password)
        // 发送请求查看手机号码是否存在
        $.ajax({
            type: "post",
            url: "../server/login.php",
            data: `userid=${userid}&password=${password.slice(0,15)}`,
            dataType: "json",
        }).done(data=>{
            console.log(data)
            // console.log(data.data)
            if(data.status == "success"){
                //登录成功
                // (1)把用户手机号码和用户名保存起来
                    // 保存cookie
                    console.log("cookie",document.cookie)
                    Cookie.setItem("userId",data.data.userId,7)
                    Cookie.setItem("username",data.data.username,7)
                    console.log("cookie",document.cookie)
                // (2)跳转首页
                alert(data.data.msg);
                location.href="../src/index.html"
            }else{
                alert(data.data.msg)
            }
        })

        // 






    })
})