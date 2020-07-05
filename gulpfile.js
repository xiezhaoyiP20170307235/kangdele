let g = require("gulp")
let cssmin = require("gulp-clean-css")


// g.task("css-min",async()=>{
//     g.src("./css/login.css")
//     .pipe(cssmin())
//     .pipe(g.dest("./cssmin"))
// })
g.task("watch-allcss", async () => {
    g.watch("./css/**/*", async () => {
        g.src("./css/**/*")
            .pipe(cssmin())
            .pipe(g.dest("./cssmin"))
    })
})
