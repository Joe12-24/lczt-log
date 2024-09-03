### 前言



这是一个前端用 Vue，后端用 Python 的 Web 框架 Flask 开发的词云生成应用。写这个小项目的起因是最近团队年终述职，有一些大佬的 PPT 上用了词云来展示自己团队一年的工作成果。还有大佬说不要守着自己的一亩三分地，在技术上拓宽视野可以帮助我们更好的成长。正好之前接触过 Python 和 R 生成词云，于是作为一个移动端开发者，想在本地跑一个生成词云的服务，就有了这个项目。

### 目录结构



先简单看一下项目的目录结构，backend 是 Flask 实现的服务端，frontend 是 Vue 实现的前端。

```
.
├── backend
│   ├── app
│   └── venv
└── frontend
    ├── README.md
    ├── build
    ├── config
    ├── dist
    ├── index.html
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── src
    └── static
```



> Vue 是渐进式 JavaScript 框架。[Vue官网](https://cn.vuejs.org/)

> Flask 是一个使用 Python 编写的轻量级 Web 应用框架。[Flask 学习资源](https://dormousehole.readthedocs.io/en/latest/)

再来看一下目前代码的运行效果： [![image.png](https://camo.githubusercontent.com/e5968b4e4be23d5972bec5b69dfec2ec1e13478b148d7da73038c38fa159759e/68747470733a2f2f692e6c6f6c692e6e65742f323032302f30312f31372f394a33443568654d565775367154432e706e67)](https://camo.githubusercontent.com/e5968b4e4be23d5972bec5b69dfec2ec1e13478b148d7da73038c38fa159759e/68747470733a2f2f692e6c6f6c692e6e65742f323032302f30312f31372f394a33443568654d565775367154432e706e67)

### 开发环境



硬件：

- macOS Mojave 10.14.6

软件：

- nodejs v11.6.0
- Python 3.7.4

请确保已经安装好了node js 环境，可参考[nodejs官网](https://nodejs.org/en/)进行安装。

### 前端开发



#### 1、安装vue-cli



安装 vue-cli
Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统。

```
$ npm install -g vue-cli
```



#### 2、创建项目



新建目录

```
$ mkdir frontend
$ cd frontend/
```