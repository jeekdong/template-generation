module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){const n=r(1),o=r(2),u=r(3),c=r(4);let i={};function l(e,t,r){let o=e.replace(process.cwd()+"/",""),c=u.readFileSync(e).toString();if(r){let t=e.split("/");t[t.length-1]=r,o=t.join("/")}i[o]=n(c,t)}e.exports=function(e){const t=e.promptList;o.prompt(t).then(t=>{(function(e,t){return new Promise(async r=>{r(u.existsSync(c.resolve(process.cwd(),t,e)))})})(e.outputName,e.outputPath).then(r=>{r?console.log("生成目标文件夹存在同名文件"):(u.statSync(e.templatePath).isDirectory()?function e(t,r,n){u.readdirSync(t).forEach(o=>{let i=c.resolve(t,o);u.statSync(i).isDirectory()?e(i,r,n):r(i,n)})}(e.templatePath,l,t):l(e.templatePath,t,e.outputName),function(e,t,r){Object.keys(e).forEach(r=>{console.log("make",r),u.mkdir(c.resolve(process.cwd(),t,r.split("/").slice(0,-1).join("/")),{recursive:!0},n=>{if(n)throw n;u.writeFileSync(c.resolve(process.cwd(),t,r),e[r],"utf8")})})}(i,e.outputPath))})})}},function(e,t){e.exports=((e,t)=>{let r="",n="let arr = []; arr.push(`";return n+=`${(r=e).replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/<%=[\s\r\n\t]*([^%>]+?)[\s\r\n\t]*%>/g,"`);arr.push($1);arr.push(`").replace(/<%/g,"`);").replace(/%>/g,"arr.push(`")}`,n+="`); return arr.join('');",new Function(n).apply(t).replace(/(>)\s*(<)/g,(e,t,r)=>t+r)})},function(e,t){e.exports=require("inquirer")},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("path")}]);