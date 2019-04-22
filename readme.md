# template-generation

> 根据模板文件自动生成新文件，减少无用的重复劳动力

只需编写模板文件(支持简易的模板语法)，配置需要的变量，即可快速生成新的模板/页面文件，提高开发效率

## Install

```shell
$ npm i template-generation --dev
// or
$ yarn add template-generation --dev
```

## Usage

引入:

```js
const Generator = require('template-generation')
```

### example

```js
// script.js
new Generator({
  promptList: [
    {
      type: 'input',
      message: '请输入该页面的标题',
      name: 'title'
    }
  ],
  outputName: '',
  outputPath: './demo',
  templatePath: './test'
})
```

```json
// package.json
"scripts": {
  "new": "node ./script.js"
},
```

## params

Generator构造函数接受一个配置对象，配置对象有四个参数

* 第一个参数是 [Inquirer.js](https://www.npmjs.com/package/inquirer) 的问题数组
* 第二个参数是输出文件名(仅在输入模板 `templatePath` 为文件时有效)
* 第三个参数是输出文件路径(输入为相对路径时，是相对于运行脚本的位置)
* 第四个参数是模板文件路径

模板文件可以使用模板语法:
其中注意插入的变量名要与 [Inquirer.js](https://www.npmjs.com/package/inquirer) 的问题数组变量名相对应

```js
// 插入变量名(一定要添加this开头)
<%= this.title %>

// 插入代码
<% if( this.title  ) {%>
const c = 10
<%}%>
```
