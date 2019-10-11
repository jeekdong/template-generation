const TemplateEngine = require('./templateParse')
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

class Generator {
  constructor(options) {
    this.options = options
    this.fileObj = {}
    this.answers = {} // inquirer记录的选择
    this.init()
  }

  init() {
    const { promptList, getAnswers } = this.options
    inquirer.prompt(promptList).then(answers => {
      this.answers = answers
      getAnswers(answers)
    })
  }

  start({outputName, outputPath, templatePath}) {
    let answers = this.answers
    this.options = {
      ...this.options,
      outputName,
      outputPath,
      templatePath
    }
    // 要生成文件的目录名
    this.exists(outputName, outputPath).then(res => {
      if(res) {
        console.log('生成目标文件夹存在同名文件')
      } else {
        // 区分生成单个文件还是目录文件
        if(fs.statSync(templatePath).isDirectory()) {
          this.readTemp(templatePath, this.genNew.bind(this), answers)
        } else {
          this.genNew(templatePath, answers, outputName)
        }
        this.writeFile(this.fileObj, this.options, answers)
      }
    })
  }

  exists(name, outputPath) {
    return new Promise(async resolve => {
      resolve(fs.existsSync(path.resolve(__dirname, outputPath, name)))
    })
  }

  readTemp(tempPath, callback, answers) {
    fs.readdirSync(tempPath).forEach(file => {
      let pathName = path.resolve(tempPath, file)
      if (fs.statSync(pathName).isDirectory()) {
        this.readTemp(pathName, callback, answers)
      } else {
        callback(pathName, answers)
      }
    })
  }

  genNew(filePath, answers, newFileName) {
    let { templatePath } = this.options
    let newPath = filePath.replace(path.resolve(__dirname , templatePath) + '/', '')
    console.log(newPath)
    let text = fs.readFileSync(filePath).toString()
    if(newFileName) {
      // 生成新文件路径名
      newPath = newFileName
    }
    newPath = this.replacePathName(newPath)
    this.fileObj[newPath] = ejs.render(text, answers)
  }

  replacePathName(str) {
    let reg = /(\$(\w*)\$)/
    if(reg.test(str)) {
      return str.replace(reg, (match, p1, p2) => this.answers[p2])
    } else {
      return str
    }
  }

  writeFile(fileObj, options) {
    let outputPath = options.outputPath
    Object.keys(fileObj).forEach(item => {
      console.log('make', item)
      fs.mkdir(
        path.resolve(
          __dirname,
          outputPath,
          item.split('/')
            .slice(0, -1)
            .join('/')
        ),
        { recursive: true },
        err => {
          if (err) throw err
          fs.writeFileSync(
            path.resolve(__dirname, outputPath, item),
            fileObj[item],
            'utf8'
          )
        }
      )
    })
  }
}

module.exports = Generator
