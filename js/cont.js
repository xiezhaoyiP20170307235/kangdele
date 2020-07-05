$(() => {

    // 1、获取对应商品列表的数据

    let good_id = location.search.split("=")[1];

    function getData(good_id) {
        $.ajax({
            type: "get",
            url: "../server/getGoodsInfo.php",
            data: { good_id },
            dataType: "json"
        }).done(data => {
            data.map(item => {
                console.log(item)
                showData(item)
            })
            // showData(data)
        })
    }
    getData(good_id)

    // 渲染页面
    function showData(data) {
        let html01 = `
        <h1>${data.name}</h1>
        `
        $(html01).insertBefore(".box-price");
        let html02 = `
        <div class="good-price"><span>$</span>${data.price}</div>
        `
        $(html02).appendTo(".box-price");
        let html03 = `
        <div class="showbox-img">
            <img src="${data.src}" alt="">
            <span id="box" class=""></span>
        </div>
        <p id="show-box" class="show-simg" style = "background-image:url(${data.src})"></p>
        `
        $(html03).appendTo(".showbox");

        let floathtml = `
            <div><img src="${data.src}" alt=""></div>
            <div>
                <h4>${data.name}</h4>
                <span><span>￥</span>${data.price}</span>
            </div>
        `
        $(".float-wrap").prepend(floathtml)

    }
    // 2、放大镜
    $(".showbox").on("mousemove", ".showbox-img", function (e) {
        let oMirrorBox = $(".showbox");
        let oBox = $("#box");
        let oShowBox = $("#show-box");
        let boxOffsetLeft = oMirrorBox[0].offsetLeft;
        let boxOffsetTop = oMirrorBox[0].offsetTop;

        let mirrorWidth = oBox[0].offsetWidth;
        let mirrorHeight = oBox[0].offsetHeight;

        // 一、数据处理
        // 1、计算oMirrorBox应该出现的位置(基于父盒子oBox的left和top)
        let left1 = e.pageX - boxOffsetLeft - mirrorWidth / 2;
        let top1 = e.pageY - boxOffsetTop - mirrorHeight / 2;

        // 2、处理边界
        if (left1 < 0) {
            left1 = 0;
        } else if (left1 + mirrorWidth > 398) {
            left1 = 398 - mirrorWidth;
        }
        if (top1 < 0) {
            top1 = 0;
        } else if (top1 + mirrorHeight > 398) {
            top1 = 398 - mirrorHeight;
        }
        // 二、外观呈现
        // 1、移动放大镜
        // console.log(oMirrorBox.style.left)
        oBox[0].style.left = `${left1}px`;
        oBox[0].style.top = `${top1}px`;

        // 2、改变show-box的背景图片的位置
        oShowBox[0].style.backgroundPosition = `-${left1 * 2}px -${top1 * 2}px`;
    })
    // 3、鼠标移入放大镜
    $(".showbox").on("mouseenter", ".showbox-img", function () {
        $("#box").toggleClass("box-op")
        $(".show-simg").css({ "display": "block" })
    })
    $(".showbox").on("mouseleave", ".showbox-img", function () {
        $("#box").toggleClass("box-op")
        $(".show-simg").css({ "display": "none" })
    })






    // 2、点击上下箭头增减数量事件
    function addNum(item, i) {
        $(".num_box").on("click", item, function () {
            let num = ($(this).parent().children("input").val()) * 1
            if (i == 1) {
                num = num + 1
            } else {
                if (num <= 1) {
                    num = 1
                    $(this).parent().children("input").val(num)
                    return
                } else {
                    num = num - 1
                }
            }
            $(this).parent().children("input").val(num)
            console.log(num)
            return num
        })
    }
    addNum(".add-num", 1)
    addNum(".red-num", 0)


    // 4、加入购物车的点击事件
    $(".box-num").on("click", ".go-cart", function () {
        let num = $(this).parent().children("div").children("input").val()
        console.log(good_id,num)
        getJson(good_id, num)
    })

    // 5、加击立即购买添加购物车并跳转购物车的点击事件
    $(".box-num").on("click", ".go-box", function () {
        let num = $(this).parent().children("div").children("input").val()
        getJson(good_id, num, "../src/cart.html")
    })

    // 发送ajax请求
    function getJson(good_id, num, href) {
        // user_id user_name
        let user_id = Cookie.getItem("userId") || "";
        let user_name = Cookie.getItem("username") || "";
        console.log(user_id, user_name);
        if (user_id && user_name) {
            // 发送请求
            console.log("已登录，可以加入购物车啦")
            $.ajax({
                url: "../server/addcart.php",
                data: { user_id, good_id, num }
            }).done(data => {
                console.log("返回值", data)
            })
            if (href == null) {
                alert("加入购物车成功！")
                return
            } else {
                location.href = href
            }
        } else {
            // 跳转登录
            alert("请先登录！")
            location.href = "../src/login.html"
        }
    }




})
