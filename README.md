# seat-select-controller (vue后台编辑座位端)

![](https://github.com/zenghao0219/files-store/blob/master/seats/process1.png?raw=true)


![](https://img.shields.io/github/stars/zenghao0219/seat-select-controller.svg?style=social)
![](https://img.shields.io/github/forks/zenghao0219/seat-select-controller.svg?style=social)
![](http://progressed.io/bar/100?title=completed)
![](https://img.shields.io/badge/language-vue-green.svg)
![](https://img.shields.io/github/package-json/dependency-version/zenghao0219/seat-select-controller/vue.svg)
![](https://img.shields.io/github/license/zenghao0219/seat-select-controller.svg)
![](https://img.shields.io/github/release/zenghao0219/seat-select-controller.svg)
<!-- ![](https://img.shields.io/github/downloads/zenghao0219/seat-select-controller/total.svg) -->
> if this project is useful to you :D , Please star this project~
>
> 如果这个项目对你有帮助 :D 请点个star吧~
>
> [点击这里预览demo(请使用PC端访问)](https://www.xollipop.top/seats-controller/#/ "请使用PC访问")


### 座位图体系项目导航

- [移动端 seat-select](https://github.com/zenghao0219/seat-select)

- [后台控制端 seat-select-controller](https://github.com/zenghao0219/seat-select-controller)

- [数据接口端 seat-select-api](https://github.com/zenghao0219/seat-select-api)


### 项目依赖组件

该项目引用到的外部常用组件
>1. [element-ui](https://element.eleme.cn "element-ui")
> 2. [better-scroll](https://github.com/ustbhuangyi/better-scroll "better-scroll")
> 3. [axios](https://github.com/axios/axios "axios")

#### 项目截图

![](https://github.com/zenghao0219/files-store/blob/master/seats/seat-controller-list.jpg?raw=true)


![](https://github.com/zenghao0219/files-store/blob/master/seats/seat-controller-index.png?raw=true)

#### 操作页面示例
```
以下为编辑座位的gif示例,可实现框选编辑
```

![](https://github.com/zenghao0219/files-store/blob/master/seats/seat-controller-demo1.gif?raw=true)

### 目录结构
```
.src
├── App.vue --(入口组件)
├── assets --(静态文件)
│   └── images
├── http.js --(axios工具类)
├── main.js --(vue入口js)
├── pages --(组件目录)
│   ├── edit
│   │   ├── HallSeat.vue --(编辑座位父组件)
│   │   └── components
│   │       ├── ControllerAside.vue --(左边控制栏组件)
│   │       ├── CoordinateSystem.vue --(坐标系组件)
│   │       └── DragDiv.vue --(框选组件)
│   └── list
│       └── SeatList.vue --(模版列表组件)
├── plugins --(插件目录)
│   └── element.js --(element-ui插件)
├── router.js --(路由文件)
└── store.js --(vuex文件)
```
### 初始化项目 (Project setup)
```
npm install
```

### 直接运行开发环境 (Compiles and hot-reloads for development)
```
npm run serve
```

### 项目打包 (Compiles and minifies for production)
```
npm run build
```
### 讨论

欢迎加群讨论: 3544395

### 项目捐赠
写代码不易...请作者喝杯咖啡呗?

<img src="https://www.xollipop.top/code.png" width="200" hegiht="300"/>

(PS: 支付的时候 请带上你的名字/昵称呀 会维护一个赞助列表~ )
