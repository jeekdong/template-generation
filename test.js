// const generator = require('template-generation')
const Generator = require('./src/index')

function init() {
  let gen = new Generator({
    promptList: [
      {
        type: 'list',
        message: '请选择新建模板的类型',
        name: 'type',
        choices: ['page', 'component']
      },
      {
        type: 'input',
        message: '请输入页面名称(文件名)',
        name: 'name',
        when(answers) {
          return answers.type === 'page'
        }
      },
      {
        type: 'input',
        message: '请输入该页面视图的名称(当该页面下仅有一个视图的时候不用输入)',
        name: 'view',
        default(answers) {
          return answers.name
        },
        when(answers) {
          return answers.type === 'page'
        }
      },
      {
        type: 'input',
        message: '请输入该页面的标题',
        name: 'title',
        when(answers) {
          return answers.type === 'page'
        }
      },
      {
        type: 'input',
        message: '请输入模板名称(文件名)',
        name: 'name',
        when(answers) {
          return answers.type === 'component'
        }
      },
      {
        type: 'confirm',
        message: '是否需要css文件',
        name: 'needCss',
        when(answers) {
          return answers.type === 'component'
        }
      }
    ],
    getAnswers: answers => {
      console.log('answers', answers)
      if(answers.type === 'page') {
        gen.start({
          outputName: '',
          outputPath: './test',
          templatePath: './template/page'
        })
      } else {
        gen.start({
          outputName: '',
          outputPath: './test',
          templatePath: './template/component'
        })
      }
    }
    // outputName: '',
    // outputPath: './test',
    // templatePath: './template/component'
  })
}

init()
