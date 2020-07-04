$(() => {
    // 二级导航
    let lis = Array.from($(".item-list li"))
    // console.log(lis)
    let liShow = Array.from($(".list-nav-li"))
    // console.log(liShow)
    lis.forEach(li => {
        $(li).mouseenter(function () {
            let idx = $(this).index()
            // console.log(idx)
            // console.log(liShow[idx])
            liShow[idx].style.display = "block"
        });
        $(li).mouseleave(function () {
            let idx = $(this).index()
            // console.log(idx)
            // console.log(liShow[idx])
            liShow[idx].style.display = "none"
        });
    });
    $(".list-nav-li").mouseenter(function () {
        $(this).css({ "display": "block" })
    })
    $(".list-nav-li").mouseleave(function () {
        $(this).css({ "display": "none" })
    })

    //  cookie获取用户名
    console.log("cookie", document.cookie)
    let user_id = Cookie.getItem("userId") || "";
    let user_name = Cookie.getItem("username") || "";
    // console.log(user_id, user_name);
    if (user_id && user_name) {
        $(".userName").text(`欢迎你：${user_name}`)
        $(".reggo").text("退出")
    } else {
        $(".userName").text("请登录")
        $(".reggo").text("免费注册")
    }

    $(".reggo").click(function() { 
        if ($(this).text() == "免费注册") {
            location.href = "./register.html";
        } else {
            Cookie.removeItem("userId")
            Cookie.removeItem("username");
            /* 重新加载 */
            window.location.reload();
        }
        
    });



})