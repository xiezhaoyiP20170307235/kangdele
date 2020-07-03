$(()=>{
    // cookie查询是否有user_id
    let user_id = Cookie.getItem("userId") || "";
    console.log(user_id);

    // 发送请求获取购物车商品
    $.ajax({
        url: "../server/getCart.php",
        data: {user_id},
        dataType: "json"
    }).done(data=>{
        console.log(data)

        let html = data.map(item=>{
            return`
            <div class="item-box clear_fix">
            <dl>
                <dd class="dd01"><input type="checkbox"></dd>
                <dd class="dd02"><a><img
                            src="${item.src}"
                            alt=""></a></dd>
                <dd class="dd03"><a>${item.name}</a></dd>
                <dd class="dd04">￥<span>${item.price}</span></dd>
                <dd class="dd05">
                    <div class="item-box-num">
                        <a></a>
                        <input type="text" value="${item.num}">
                        <a></a>
                    </div>
                </dd>
                <dd class="dd06"><span>￥${item.price*item.num}</span></dd>
                <dd class="dd07"><a>删除</a></dd>
            </dl>
        </div>
            `
        }).join("")
        $(".content-item").html(html)
        
    })


})