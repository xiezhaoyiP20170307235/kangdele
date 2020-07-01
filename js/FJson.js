class FJson {
    constructor(data) {
        this.data = data
        this.root = null
    }
    init() {
        this.renderUI()
        // this.addEventHandler()
    }
    renderUI() {
        // 顶部ul
        let typeHtml = this.data.types.map((item, idx) => `<li class="${idx === 0 ? "active" : ""}">${item}</li>`).join("")
        // 底部ul
        let liHtml = ""
        this.data.data.forEach((item, index) => {
            // console.log(index)
            if (index == 3) {
                liHtml += `
                <li class="item-li-text">
                    <p class="item-img"><a><img src="${item.src}" alt=""></a></p>
                    <p class="item-name"><a>${item.name}</a></p>
                    <p class="item-price">￥${item.price}</p>
                    <p class="mingarybar"></p>
                    <p class="mingary">
                        <a href="https://www.baiji.com.cn/goods-16263.html">启尔畅</a>
                        <a href="https://www.baiji.com.cn/goods-16263.html">甲磺司特颗粒</a>
                        <a href="https://www.baiji.com.cn/goods-16263.html">昂润 比斯海乐</a>
                        <a href="https://www.baiji.com.cn/goods-16263.html">信必可都保</a>
                        <a href="https://www.baiji.com.cn/goods-16263.html">顺尔宁</a>
                        <a href="https://www.baiji.com.cn/goods-16263.html">普米克令舒</a>
                        <a href="https://www.baiji.com.cn/goods-16263.html">思力华</a>
                        <a href="https://www.baiji.com.cn/goods-16263.html">舒利迭</a>
                    </p>
                </li>`
            } else {
                liHtml += `
                <li>
                    <p class="item-img"><a><img src="${item.src}" alt=""></a></p>
                    <p class="item-name"><a>${item.name}</a></p>
                    <p class="item-price">￥${item.price}</p>
                </li> `
            }
            // console.log(src)

        });

        let html = `
        <div class="mct-nav">
        <h3>${this.data.title}</h3>
        <div class="mct-nav-ul clear_fix">
            <ul>${typeHtml}</ul>
        </div>
        <div class="mct-nav-more">
            <a href="">查看全部<s></s></a>
        </div>
    </div>
    <div class="mct-box clear_fix">
        <div class="mct-box-item clear_fix">
            <ul class="list show-box">
                <div class="item-bingimg"><a href="affiche-0-0-693-15763.html"><img src="${this.data.srcT}" alt=""></a></div>
                ${liHtml}
              
            </ul>
        </div>
        <div class="mc-bottom">
            <a href="/affiche-gnq2018-0-395-0.html">
            <img src="${this.data.srcB}" alt=""></a>
        </div>
    </div>
        `
        this.root = $(html)
        this.root.appendTo(".main-cotent");
    }

}
class FJsonS {
    constructor(data) {
        this.data = data
        this.root = null
    }
    init() {
        this.renderUI()
        this.addEventHandler()
    }
    renderUI() {
        // 顶部ul
        let typeHtml = this.data.types.map((item, idx) => `<li class="${idx === 0 ? "active" : ""}">${item}</li>`).join("")
        // 底部ul
        let ulHtml = ""

        this.data.data.forEach((item, index) => {
            let liHtml = ""
            item.map((ele, idx) => {
                
                // console.log(idx)
                if (idx == 3) {
                    liHtml += `
                <li class="item-li-text">
                    <p class="item-img"><a><img src="${ele.src}" alt=""></a></p>
                    <p class="item-name"><a>${ele.name}</a></p>
                    <p class="item-price">￥${ele.price}</p>
                    <p class="mingarybar"></p>
                    <p class="mingary">
                        <a href="https://www.baiji.com.cn/goods-16263.html">启尔畅</a>
                        <a href="https://www.baiji.com.cn/goods-16263.html">甲磺司特颗粒</a>
                        <a href="https://www.baiji.com.cn/goods-16263.html">昂润 比斯海乐</a>
                        <a href="https://www.baiji.com.cn/goods-16263.html">信必可都保</a>
                        <a href="https://www.baiji.com.cn/goods-16263.html">顺尔宁</a>
                        <a href="https://www.baiji.com.cn/goods-16263.html">普米克令舒</a>
                        <a href="https://www.baiji.com.cn/goods-16263.html">思力华</a>
                        <a href="https://www.baiji.com.cn/goods-16263.html">舒利迭</a>
                    </p>
                </li>`
                } else {
                    liHtml += `
                <li>
                    <p class="item-img"><a><img src="${ele.src}" alt=""></a></p>
                    <p class="item-name"><a>${ele.name}</a></p>
                    <p class="item-price">￥${ele.price}</p>
                </li> `
                }
                // console.log(liHtml)
                return liHtml
            }).join("")
            // console.log(liHtml)
            

            ulHtml += `<ul class="list ${index == 0 ? "show-box" : ""}">
        <div class="item-bingimg"><a href="affiche-0-0-693-15763.html"><img src="${this.data.srcT}" alt=""></a></div>
        ${liHtml}
        </ul>`;
        })


        let html = `
        <div class="mct-nav">
        <h3>${this.data.title}</h3>
        <div class="mct-nav-ul clear_fix">
            <ul>${typeHtml}</ul>
        </div>
        <div class="mct-nav-more">
            <a href="">查看全部<s></s></a>
        </div>
    </div>
    <div class="mct-box clear_fix">
        <div class="mct-box-item clear_fix">
           ${ulHtml}
        </div>
        <div class="mc-bottom">
            <a href="/affiche-gnq2018-0-395-0.html">
            <img src="${this.data.srcB}" alt=""></a>
        </div>
    </div>
        `
        this.root = $(html)
        this.root.appendTo(".main-cotent");
    }
    addEventHandler() {
        let self = this;
        this.root.find(".mct-nav-ul ul").children("li").click(function () {
            // console.log("!!!!!")
            /* 1、设置当前标签的选中状态(排它) */
            $(this).addClass("active").siblings().removeClass("active");
            let index = $(this).index();
            /* 2、设置让列表进行切换 */
            // console.log($(".list", self.root));
            $(".list", self.root).eq(index).addClass("show-box").siblings().removeClass("show-box");
        })
    }

}

class FLinks{
    constructor(data) {
        this.data = data
        this.root = null
        // console.log(data)
    }
    init() {
        this.renderUI()
    }
    renderUI() {
        let ula = this.data.map(item=>`<a href="">${item.text}</a>`).join("")
        // let typeHtml = this.data.types.map((item, idx) => `<li class="${idx === 0 ? "active" : ""}">${item}</li>`).join("")
        console.log(ula)

        let html = `
            <a href="">${ula}</a>
        `
        this.root = $(ula)
        this.root.appendTo(".mlinks-b");
    }
   

}