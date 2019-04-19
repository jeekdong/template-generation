const generator = require('./dist/templateGeneration')
// const path = require('path')

// console.log(path.resolve(__dirname, 'test/hh'))

generator({
  promptList: [
    {
      type: 'input',
      message: '请输入该页面的标题',
      name: 'title'
    }
  ],
  genDirName: 'gogo',
  outputPath: './demo',
  templatePath: './test'
})