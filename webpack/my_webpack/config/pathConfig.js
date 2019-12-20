const path = require("path");
const fs = require("fs");
const appDirectory = fs.realpathSync(process.cwd()); // 获取当前根目录
const resolvePath = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  appHtml: resolvePath("public/index.html"), // 模板html
  appBuild: resolvePath("dist"), // 打包目录
  appIndexJs: resolvePath("src/main.js"), // 入口js文件
  cssTreeShaking:[
    // 要做 CSS Tree Shaking 的路径文件
    resolvePath('src/*.html'), // 请注意，我们同样需要对 html 文件进行 tree shaking
    resolvePath('src/*.js') //后缀自己更改
  ],
  alias:{ //别名路径
     "@":  resolvePath('src'),
     'css':resolvePath('src/css')
  },
  dllPlugin:{ //dll静态资源缓存
    output:resolvePath('dll'),
    manifestPath:resolvePath('dll/json/[name]-manifest.json'),
  },
  dllJs:(src)=>{ //缓存包路径
    return resolvePath(`dll/js/${src}.js`)
  },
  manifestJson:(src)=>{ //dll动态链接路径
    return resolvePath(`dll/json/${src}-manifest.json`)
  }
};