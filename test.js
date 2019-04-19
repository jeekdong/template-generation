const generator = require('./dist/templateGeneration')
// const generator = require('./src/index')

generator({
  promptList: [
    {
      type: 'input',
      message: '请输入该页面的标题',
      name: 'title'
    }
  ],
  outputName: 'gogo',
  outputPath: './demo',
  templatePath: './test'
})