$(() => {
    // 1、发送网络请求获取服务器端的数据
    getDataAndRenderUi("default")

    function getDataAndRenderUi(sort,page = 0) {
        $.ajax({
            url: "../server/getList.php",
            data: {
                sort,
                page: page
            },
            dataType: "json"
        }).done(data => {
            console.log(typeof data)
            let html = data.map(item => {
                return `
            <li id="${item.good_id}">
            <div class="con-item-pic">
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
                           <a class="add-num" ></a>
                           <a class="red-num" ></a>
                       </span>
                    </div>
                    <div>
                        <a class="con-gocart" style="cursor: pointer">加入购物车</a>
                    </div>
                </div>
                <div class="con-item-go">
                    <a>立即购买</a>
                </div>
            </div>
            <div class="con-item-bg"></div>
            <a href="#"><em></em>在线咨询</a>
        </li>
            `
            }).join("")
            $(".r-con-ul").html(html)
        })
    }


    // 2、点击上下箭头增减数量事件
    function addNum(item, i) {
        $(".r-con-ul").on("click", item, function () {
            let num = ($(this).parent().prev().val()) * 1
            if (i == 1) {
                num = num + 1
            } else {
                if (num <= 1) {
                    num = 1
                    $(this).parent().prev().val(num)
                    return
                } else {
                    num = num - 1
                }
            }
            $(this).parent().prev().val(num)
            console.log(num)
            return num
        })
    }
    addNum(".add-num", 1)
    addNum(".red-num", 0)

    // 3、加入购物车的点击事件
    $(".r-con-ul").on("click", ".con-gocart", function () {
        let good_id = $(this).parents("li").attr("id")
        let num = $(this).parent().prev().children("input").val()
        getJson(good_id, num)
    })

    // 4、加击立即购买添加购物车并跳转购物车的点击事件
    $(".r-con-ul").on("click", ".con-item-go", function () {
        let good_id = $(this).parents("li").attr("id")
        let num = $(this).prev().children("div").children("input").val()
        // console.log(good_id,num)
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

    // 5、排序功能
    $(".nav-l li").click(function () {
        $(this).addClass("cur02").siblings().removeClass("cur02")

        let sortType = $(this).attr("data-sort")
        console.log(sortType)

        getDataAndRenderUi(sortType)

    })
    // 6、获取总页码的数量
    getPageCount()
    function getPageCount() {
        $.ajax({
            type: "get",
            url: "../server/getPageCount.php",
            success: function (data) {
                console.log(data)
                let pageStr = ""
                for (let i = 0; i < data; i++) {
                    pageStr += `<li class="${i == 0 ? "cur" : ""}">${i + 1}</li>`
                }
                $(".page-c-ul").html(pageStr)
            }
        });
    }

    // 7、分页功能
    $(".page-c-ul").on("click", "li", function () {
        let page = $(this).text() * 1 -1
        console.log(page)
        console.log("!!")


        $(this).addClass("cur").siblings().removeClass("cur");
        getDataAndRenderUi($(".cur02").data().sort, page)
    })

    // 8、上一页和下一页的功能

   $("#a-prev,#a-next").click(function() {
    console.log("!!!!")
        /* 设置选中状态 */
        let page = $(".cur").text() * 1 -1;
        console.log("page",page)
        console.log(this.id)
        if (this.id == "a-prev") {
            page--;
            console.log("page",page)
        } else if (this.id == "a-next") {
            page++;
        }

        $(".page-c-ul").eq(page).addClass("cur").siblings().removeClass("cur")
        getDataAndRenderUi($(".cur02").data().sort, page)
    })

})