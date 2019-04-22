const TemplateEngine = require('./templateParse')
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')

class Generator {
  constructor(options) {
    this.options = options
    this.fileObj = {}
    this.init()
  }

  init() {
    const {outputName, outputPath, templatePath, promptList} = this.options
    inquirer.prompt(promptList).then(answers => {
      this.answers = answers
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
    })
  }

  exists(name, outputPath) {
    return new Promise(async resolve => {
      resolve(fs.existsSync(path.resolve(process.cwd(), outputPath, name)))
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
    let newPath = filePath.replace(path.resolve(process.cwd() , templatePath) + '/', '')
    let text = fs.readFileSync(filePath).toString()
    if(newFileName) {
      // 生成新文件路径名
      newPath = newFileName
    }
    this.fileObj[newPath] = TemplateEngine(text, answers)
  }

  writeFile(fileObj, options) {
    let outputPath = options.outputPath
    Object.keys(fileObj).forEach(item => {
      console.log('make', item)
      fs.mkdir(
        path.resolve(
          process.cwd(),
          outputPath,
          item.split('/')
            .slice(0, -1)
            .join('/')
        ),
        { recursive: true },
        err => {
          if (err) throw err
          fs.writeFileSync(
            path.resolve(process.cwd(), outputPath, item),
            fileObj[item],
            'utf8'
          )
        }
      )
    })
  }
}

module.exports = Generator