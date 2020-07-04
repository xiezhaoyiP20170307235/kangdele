$(() => {
    // cookie查询是否有user_id
    let user_id = Cookie.getItem("userId") || "";
    // console.log(user_id);

    // 发送请求获取购物车商品
    $.ajax({
        url: "../server/getCart.php",
        data: { user_id },
        dataType: "json"
    }).done(data => {
        // console.log(data)

        let html = data.map(item => {
            return `
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
                <dd class="dd06"><span>￥${item.price * item.num}</span></dd>
                <dd class="dd07"><a class="delete-item">删除</a></dd>
            </dl>
        </div>
            `
        }).join("")
        $(".content-item").html(html)

    })
    // 购物车全选功能：点击的时候切换选中的状态
    $(".con-con").on("click", ".all-input", function () {

        let allInput = $(".content-item")[0].querySelectorAll("input[type=checkbox]")
        if ($(this).is(":checked")) {
            let moneyall = 0
            allInput.forEach(item => {
                $(item).prop("checked", true)
                moneyall += $(item).parent().parent().children(".dd06").text().substr(1) * 1
                console.log(typeof moneyall)
                // console.log($(item).parent().parent().children(".dd06").text().substr(1))
                $(".item-price em").html(moneyall)
            })
            
        } else {
            allInput.forEach(item => {
                console.log(item);
                
                $(item).prop("checked", false)
                // $(".item-price em").html(0)
            })

        }
    })
    // 选中计算总价
    let money = 0
    $(".con-content").on("click", "input[type=checkbox]", function () {

        if ($(this).is(":checked")) {
            // console.log($(this).parent().parent().children(".dd06").text().substr(1))
            money += $(this).parent().parent().children(".dd06").text().substr(1) * 1
            // console.log(money)
            $(".item-price em").html(money)
            // console.log(money)

        } else {
            money -= $(this).parent().parent().children(".dd06").text().substr(1) * 1
            $(".item-price em").html(money)
        }
        // console.log(money)
    })

    // 封装计算商品的总数和总价
    // function computedTotal() {
    //     // let flag = $(".order_item").find(".son_check").next().hasClass("mark");
    //     let ele = $(".order_item").filter(function() {
    //         return $(".son_check", this).next().hasClass("mark") == true;
    //     })

    //     /* 计算数量 */
    //     let total = 0;
    //     let totalPrice = 0;
    //     ele.each(function(index, item) {
    //         console.log(index, item, $(item).find(".sum").val(), $(item).find(".sum_price").text().slice(1));
    //         total += $(item).find(".sum").val() * 1;
    //         totalPrice += $(item).find(".sum_price").text().slice(1) * 1;
    //     })

    //     $(".piece_num").text(total);
    //     $(".total_text").text("￥" + totalPrice.toFixed(2));
    // }



    //   删除购物车中的商品
    function deleteCount(good_id) {
        $.get("../server/deleteGoods.php", {
            "user_id": getCookie("user_id"),
            "good_id": good_id
        }, function (data) {
            if (data == "0") {
                alert("服务器出错：删除商品失败");
            } else {
            }
        })
    }
    $(".content-item").on("click", ".delete-item", function () {
        console.log("!!")


    })



})