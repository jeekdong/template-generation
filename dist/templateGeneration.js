module.exports=function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=0)}([function(e,r,t){const n=t(1),o=t(2),c=t(3),u=t(4);let i={};function s(e,r){let t=e.replace(process.cwd()+"/",""),o=c.readFileSync(e).toString();i[t]=n(o,r)}e.exports=function(e){const r=e.promptList;o.prompt(r).then(r=>{(function(e,r){return new Promise(async t=>{t(c.existsSync(u.resolve(process.cwd(),r,e)))})})(e.genDirName,e.outputPath).then(t=>{t?console.log("生成目标文件夹存在同名文件"):(function e(r,t,n){c.readdirSync(r).forEach(o=>{let i=u.resolve(r,o);c.statSync(i).isDirectory()?e(i,t,n):t(i,n)})}(e.templatePath,s,r),function(e,r,t){Object.keys(e).forEach(t=>{console.log("make",t),c.mkdir(u.resolve(process.cwd(),r,t.split("/").slice(0,-1).join("/")),{recursive:!0},n=>{if(n)throw n;c.writeFileSync(u.resolve(process.cwd(),r,t),e[t],"utf8")})})}(i,e.outputPath))})})}},function(e,r){e.exports=((e,r)=>{let t="",n="let arr = []; arr.push('";return n+=`${(t=/[\s\W]/g.test(e)?e:document.querySelector(e).innerHTML).replace(/[\r\n\t]/g,"").replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/<%=\s*([^%>]+?)\s*%>/g,"');arr.push($1);arr.push('").replace(/<%/g,"');").replace(/%>/g,"arr.push('")}`,n+="'); return arr.join('');",new Function(n).apply(r).replace(/(>)\s*(<)/g,(e,r,t)=>r+t)})},function(e,r){e.exports=require("inquirer")},function(e,r){e.exports=require("fs")},function(e,r){e.exports=require("path")}]);