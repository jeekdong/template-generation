const TemplateEngine = require('./templateParse')
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')

let fileObj = {}

function generator(options) {
  const promptList = options.promptList
  inquirer.prompt(promptList).then(answers => {
    // 要生成文件的目录名
    exists(options.genDirName, options.outputPath).then(res => {
      if(res) {
        console.log('生成目标文件夹存在同名文件')
      } else {
        readTemp(options.templatePath, genNew, answers)
        writeFile(fileObj, options.outputPath, answers)
      }
    })
  })
}

function exists(name, outputPath) {
  return new Promise(async resolve => {
    resolve(fs.existsSync(path.resolve(process.cwd(), outputPath, name)))
  })
}

function readTemp(tempPath, callback, answers) {
  fs.readdirSync(tempPath).forEach(file => {
    let pathName = path.resolve(tempPath, file)
    if (fs.statSync(pathName).isDirectory()) {
      readTemp(pathName, callback, answers)
    } else {
      callback(pathName, answers)
    }
  })
}

function genNew(filePath, answers) {
  let newPath = filePath.replace(process.cwd() + '/', '')
  let text = fs.readFileSync(filePath).toString()
  fileObj[newPath] = TemplateEngine(text, answers)
}

function writeFile(fileObj, outputPath, type) {
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

module.exports = generator