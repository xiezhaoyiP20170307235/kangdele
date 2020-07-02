$(() => {
    // 1、发送网络请求获取服务器端的数据
    $.ajax({
        url: "../server/getList.php",
        dataType: "json"
    }).done(data => {
        console.log(typeof data)
        let html = data.map(item => {
            return `
            <li>
            <div id="${item.good_id}" class="con-item-pic">
                <a href="#"><img src="${item.src}" alt=""></a>
            </div>
            <div class="con-item-desc">
                <p class="con-item-name">${item.name}</p>
                <p class="con-item-pric"><strong>￥${item.price}</strong></p>
            </div>
            <div class="con-item-car">
                <span>在售</span>
                <div class="con-item-num clear_fix">
                    <div>
                       <input type="text" value="1"> 
                       <span>
                           <a href="#"></a>
                           <a href="#"></a>
                       </span>
                    </div>
                    <div>
                        <a href="#">加入购物车</a>
                    </div>
                </div>
                <div class="con-item-go">
                    <a >立即购买</a>
                </div>
            </div>
            <div class="con-item-bg"></div>
            <a href="#"><em></em>在线咨询</a>
        </li>
            `
        }).join("")
        $(".r-con-ul").html(html)


    })
    // 2、加入购物车的点击事件
    $(".r-con-ul").on("click",".con-item-go",function () {
        // user_id user_name
        console.log("!!!")
        // if () {

        // } else {
            // 去跳转
            alert("请先登录！")
            location.href = "../src/login.html"
        // }
    })

})