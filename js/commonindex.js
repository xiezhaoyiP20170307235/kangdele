 // 二级导航
 let lis = Array.from($(".item-list li"))
 console.log(lis)
 let liShow = Array.from($(".list-nav-li"))
 console.log(liShow)
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