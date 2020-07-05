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
                    <dd class="dd01" data-goodid="${item.good_id}"><input type="checkbox"></dd>
                    <dd class="dd02"><a><img
                                src="${item.src}"
                                alt=""></a></dd>
                    <dd class="dd03"><a>${item.name}</a></dd>
                    <dd class="dd04">￥<span>${item.price}</span></dd>
                    <dd class="dd05">
                        <div class="item-box-num">
                            <a class="red-num"></a>
                            <input type="text" value="${item.num}">
                            <a class="add-num"></a>
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

    let xuanzhon = 0
    // 购物车全选功能：点击的时候切换选中的状态
    $(".con-con").on("click", ".all-input", function () {
        let allInput = $(".con-con")[0].querySelectorAll("input[type=checkbox]")
        console.log(typeof allInput)
        if ($(this).is(":checked")) {
            let moneyall = 0
            allInput.forEach(item => {
                $(item).prop("checked", true)
                moneyall += $(item).parent().parent().children(".dd06").text().substr(1) * 1
                // console.log(typeof moneyall)
                // console.log($(item).parent().parent().children(".dd06").text().substr(1))
                $(".item-price em").html(moneyall)
                xuanzhon++
            })
            console.log(typeof xuanzhon)
            xuanzhon = xuanzhon - 2
            $(".cart-num s").text(xuanzhon)

        } else {
            allInput.forEach(item => {
                // console.log(item);
                $(item).prop("checked", false)
                $(".item-price em").html(0)
                xuanzhon--
            })
            xuanzhon = xuanzhon + 2
            $(".cart-num s").text(xuanzhon)
        }
    })
    // 选中计算总价
    let money = 0
    $(".content-item").on("click", "input[type=checkbox]", function () {
        console.log($(this))

        if ($(this).is(":checked")) {
            // console.log($(this).parent().parent().children(".dd06").text().substr(1))
            money += $(this).parent().parent().children(".dd06").text().substr(1) * 1
            // console.log(money)
            $(".item-price em").html(money)
            // console.log(money)
            xuanzhon++
            $(".cart-num s").text(xuanzhon)
        } else {
            money = $(".item-price em")[0].innerText
            money -= $(this).parent().parent().children(".dd06").text().substr(1) * 1
            $(".item-price em").html(money)
            xuanzhon--
            $(".cart-num s").text(xuanzhon)
        }

        // 修改选中数量

    })


    // 结算
    $(".gomoney").click(function () {
        $(".ewm").css({ "display": "block" })
    })
    $(".ewm").click(function () {
        $(this).css({ "display": "none" })
    })


    //   删除购物车中的商品
    function deleteCount(good_id) {
        $.get("../server/deleteGoods.php", {
            "user_id": Cookie.getItem("userId"),
            "good_id": good_id
        }, function (data) {
            if (data == "0") {
                alert("服务器出错：删除商品失败");
            } else {
            }
        })
    }
    $(".content-item").on("click", ".delete-item", function () {
        if (confirm("亲，您真的要删除吗？")) {
            $(this).parent().parent().parent().remove();
            //删除购物车中商品

            let good_id = $(this).parent().parent().children(".dd01").attr("data-goodid")
            deleteCount(good_id)

        }
    })

    // 数量增加
    // 点击上下箭头增减数量事件
    function updateNum(good_id, num) {

        $.get("../server/updateGoods.php", {
            "user_id": Cookie.getItem("userId"),
            "good_id": good_id,
            "num": num
        }, function (data) {
            if (data == "0") {
                alert("服务器出错：更新商品数量失败");
            } else {
                console.log("商品数量修改成功")
            }
        })
    }
    function addNum(item, i) {
        $(".content-item").on("click", item, function () {
            let num = ($(this).parent().children("input").val()) * 1
            let good_id = $(this).parent().parent().parent().children(".dd01").attr("data-goodid")
            if (i == 1) {
                num = num + 1
                console.log(num, good_id)
                updateNum(good_id, num)
            } else {
                if (num <= 1) {
                    num = 1
                    return
                } else {
                    num = num - 1
                    console.log(num, good_id)
                    updateNum(good_id, num)
                }
            }
            $(this).parent().children("input").val(num)
            let price = ($(this).parent().parent().parent().children(".dd04").children("span").text()) * 1
            let zonjia = num * price
            zonjia = "￥"+zonjia
            $(this).parent().parent().parent().children(".dd06").children("span").text(zonjia)
        })


    }
    addNum(".add-num", 1)
    addNum(".red-num", 0)








})