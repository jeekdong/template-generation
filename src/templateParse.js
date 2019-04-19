const tmpl = (str, data) => {
  let tpl = ''
  if (/[\s\W]/g.test(str)) {
    tpl = str
  } else {
    tpl = document.querySelector(str).innerHTML
  }

  let res = `let arr = []; arr.push(\``
  res += `${tpl
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/<%=[\s\r\n\t]*([^%>]+?)[\s\r\n\t]*%>/g, "`);arr.push($1);arr.push(`")
    .replace(/<%/g, "`);")
    .replace(/%>/g, "arr.push(`")}`
  res += "`); return arr.join('');"
  let fn = new Function(res) // eslint-disable-line

  // 返回的字符串再过滤一次 render 中 html 标签间的空格
  return fn.apply(data).replace(/(>)\s*(<)/g, (match, p1, p2) => {
    return p1 + p2
  })
}

module.exports = tmpl
